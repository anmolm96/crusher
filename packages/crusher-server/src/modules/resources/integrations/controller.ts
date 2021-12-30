import { SlackService } from "@modules/slack/service";
import { GithubService } from "@modules/thirdParty/github/service";
import { generateToken } from "@utils/auth";
import { resolvePathToBackendURI } from "@utils/uri";
import { Authorized, BadRequestError, Body, CurrentUser, Get, JsonController, Param, Post, QueryParams, Res } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AlertingService } from "../alerting/service";
import { GithubIntegrationService } from "./githubIntegration.service";
import { IntegrationServiceEnum } from "./interface";
import { IntegrationsService } from "./service";
import { fetch } from "@utils/fetch";

@Service()
@JsonController("")
class IntegrationsController {
	@Inject()
	private slackService: SlackService;
	@Inject()
	private githubIntegrationService: GithubIntegrationService;
	@Inject()
	private integrationsService: IntegrationsService;
	@Inject()
	private projectAlertingService: AlertingService;

	@Authorized()
	@Get("/integrations/slack/actions/add")
	async addSlackIntegration(@CurrentUser({ required: true }) userInfo, @QueryParams() params, @Res() res) {
		const { code: slackCode, state: encodedState } = params;

		const { projectId, redirectUrl } = JSON.parse(decodeURIComponent(encodedState));
		const integrationConfig = await this.slackService.verifySlackIntegrationRequest(slackCode);

		const existingSlackIntegration = await this.integrationsService.getSlackIntegration(projectId);
		if (existingSlackIntegration) {
			await this.integrationsService.updateIntegration(integrationConfig, existingSlackIntegration.id);
		} else {
			await this.integrationsService.addIntegration(integrationConfig, projectId);
		}

		await res.redirect(redirectUrl);
		return res;
	}

	@Authorized()
	@Get("/integrations/:project_id/slack/actions/remove")
	async removeSlackIntegration(@CurrentUser({ required: true }) userInfo, @Param("project_id") projectId: number) {
		const existingSlackIntegration = await this.integrationsService.getSlackIntegration(projectId);
		if (!existingSlackIntegration) {
			throw new BadRequestError("Slack integration not found");
		}

		await this.integrationsService.deleteIntegration(existingSlackIntegration.id);

		return { status: "Successful" };
	}

	@Authorized()
	@Post("/integrations/:project_id/slack/actions/save.settings")
	async saveSlackIntegrationSettings(
		@CurrentUser({ required: true }) user,
		@Param("project_id") projectId: number,
		@Body() body: { alertChannel: any; normalChannel: any },
	) {
		return this.integrationsService.saveSlackSettings({ alertChannel: body.alertChannel, normalChannel: body.normalChannel }, projectId);
	}

	@Authorized()
	@Get("/integrations/:project_id")
	async getIntegrations(@CurrentUser({ required: true }) user, @Param("project_id") projectId: number) {
		const integrationsList = await this.integrationsService.getListOfIntegrations(projectId);
		const slackIntegration = integrationsList.find((item) => item.integrationName === IntegrationServiceEnum.SLACK);

		return {
			emailIntegration: true,
			slackIntegration: slackIntegration,
		};
	}

	@Authorized()
	@Post("/integrations/:project_id/github/actions/link")
	async linkGithubRepo(
		@CurrentUser({ required: true }) user,
		@Param("project_id") projectId: number,
		@Body() body: { repoId: number; repoName: string; repoFullName: string; repoLink: string; installationId: string },
	) {
		const { user_id } = user;
		const { repoId, repoLink, installationId, repoFullName } = body;

		const linkedRepo = await this.githubIntegrationService.getLinkedRepo(projectId);
		if (linkedRepo) throw Error("Project is already connected to a github repository");

		const doc = await this.githubIntegrationService.linkRepo(repoId, repoFullName, installationId, repoLink, projectId, user_id);

		return {
			status: "Successful",
			data: { ...(doc.toObject() as any), _id: doc._id.toString() },
		};
	}

	@Authorized()
	@Post("/integrations/:project_id/github/actions/unlink")
	async unlinkGithubRepo(@CurrentUser({ required: true }) user, @Body() body: { id: string }) {
		if (!body.id) throw new BadRequestError("Integration id not provided");

		await this.githubIntegrationService.unlinkRepo(body.id);
		return "Successful";
	}

	@Authorized()
	@Get("/integrations/:project_id/github/list/repo")
	async getLinkedReposList(@CurrentUser({ required: true }) user, @Param("project_id") projectId: number) {
		return {
			linkedRepo: await this.githubIntegrationService.getLinkedRepo(projectId),
		};
	}

	// @TODO: Clean "cannot set headers after they are sent" error
	@Authorized()
	@Get("/integrations/:project_id/github/actions/callback")
	async connectGithubAccount(@QueryParams() params, @Res() res: any) {
		const { code } = params;
		const githubService = new GithubService();
		const tokenInfo = await githubService.parseGithubAccessToken(code);

		const redirectUrl = new URL(process.env.FRONTEND_URL || "http://localhost:3000/");
		redirectUrl.searchParams.append("token", (tokenInfo as any).token);
		res.redirect(redirectUrl.toString());
	}

	@Authorized()
	@Get("/integrations/:project_id/github/actions/code")
	async getGithubActionCode(@CurrentUser({ required: true }) user, @Param("project_id") projectId: number) {
		const linkedRepo = await this.githubIntegrationService.getLinkedRepo(projectId);
		if (!linkedRepo) throw new BadRequestError("No repo linked");

		const githubUserToken = generateToken(user.user_id, user.team_id);

		return {
			code: `- name: Start crusher tests
  run: |
    curl --location --request POST '${resolvePathToBackendURI(`projects/${projectId}/tests/actions/run`)}' \\
    --header 'Content-Type: application/x-www-form-urlencoded' \\
    --cookie "token=${githubUserToken}" \\
    --data-urlencode 'githubRepoName=${linkedRepo.repoName}' \\
    --data-urlencode 'githubCommitId=\${{github.event.pull_request.head.sha}}'`,
		};
	}

	@Authorized()
	@Get("/integrations/:project_id/slack/channels")
	async getSlackChannels(@CurrentUser({ required: true }) userInfo, @Param("project_id") projectId: number, @QueryParams() params: { cursor?: string }) {
		const slackIntegration = await this.integrationsService.getSlackIntegration(projectId);
		if (!slackIntegration) throw new BadRequestError("No slack account connected");

		const slackIntegrationConfig = slackIntegration.meta;

		const fetchFromSlack = async (cursor?: string) => {
			const { channels, nextCursor } = await fetch("https://slack.com/api/conversations.list?types=public_channel,private_channel", {
				header: {
					Authorization: `Bearer ${slackIntegrationConfig.oAuthInfo.accessToken}`,
				},
				method: "GET",
				payload: {
					cursor: cursor || "",
					limit: 50,
					exclude_archived: true,
				},
			}).then((data: any) => ({
				accessToken: slackIntegrationConfig.oAuthInfo.accessToken,
				nextCursor: data.response_metadata ? data.response_metadata.next_cursor : "",
				channels: data.channels ? data.channels.map((channel) => ({ id: channel.id, name: channel.name })) : [],
			}));

			return { channels, nextCursor };
		};

		// Hit api until channels is not empty and nextCursor is present
		let channels = [];
		let nextCursor = params.cursor || "";
		do {
			const { channels: newChannels, nextCursor: newNextCursor } = await fetchFromSlack(nextCursor);
			channels = channels.concat(newChannels);
			nextCursor = newNextCursor;
		} while (channels.length === 0 && nextCursor);

		return { channels, nextCursor };
	}
}

export { IntegrationsController };
