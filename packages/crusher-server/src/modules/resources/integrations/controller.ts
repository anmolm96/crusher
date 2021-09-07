import { SlackService } from "@modules/slack/service";
import { Authorized, CurrentUser, Get, JsonController, Param, Post, QueryParams, Res } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AlertingService } from "../alerting/service";
import { IntegrationServiceEnum } from "./interface";
import { IntegrationsService } from "./service";

@Service()
@JsonController("")
class IntegrationsController {
	@Inject()
	private slackService: SlackService;
	@Inject()
	private integrationsService: IntegrationsService;
	@Inject()
	private projectAlertingService: AlertingService;

	@Authorized()
	@Get("/integrations/slack/actions/add")
	async addSlackIntegration(@CurrentUser({ required: true }) user, @QueryParams() params, @Res() res) {
		const { code: slackCode, state: projectId } = params;

		const integrationConfig = await this.slackService.verifySlackIntegrationRequest(slackCode);
		const slackIntegrationRecord = await this.integrationsService.addSlackIntegration(integrationConfig, projectId);

		await this.projectAlertingService.addAlertIntegrationToProject({
			integrationId: slackIntegrationRecord.insert_id,
			projectId: projectId,
			userId: user.user_id,
			config: integrationConfig,
		});

		// @TODO: Add a redirect here
		return "Successful";
	}

	@Authorized()
	@Get("/integrations/:project_id")
	async getIntegrations(@CurrentUser({ required: true }) user, @Param("project_id") projectId: number) {
		const integrationsList = await this.integrationsService.getListOfIntegrations(projectId);
		const isSlackIntegrated = integrationsList.findIndex((item) => item.integrationName === IntegrationServiceEnum.SLACK);

		return {
			emailIntegration: true,
			slackIntegration: isSlackIntegrated !== -1,
		};
	}
}

export { IntegrationsController };
