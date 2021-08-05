import { UsersService } from "@modules/resources/users/service";
import { JsonController, Get, Authorized, BadRequestError, Post, Param, CurrentUser, Body, QueryParams, Params } from "routing-controllers";
import { Inject, Service } from "typedi";
import { TestService } from "@modules/resources/tests/service";
import { isUsingLocalStorage } from "@utils/helper";
import { IProjectTestsListResponse } from "@crusher-shared/types/response/iProjectTestsListResponse";
import { ICreateTestPayload } from "@modules/resources/tests/interface";
import { iAction } from "@crusher-shared/types/action";

@Service()
@JsonController("")
export class TestController {
	@Inject()
	private userService: UsersService;
	@Inject()
	private testService: TestService;

	@Post("/tests/actions/save.temp")
	async saveTempTest(@Body() body: { events: Array<iAction> }) {
		if (!body.events) throw new BadRequestError("No events provided");

		const result = await this.testService.saveTempTest(body.events);

		return { insertId: result.insertId };
	}

	@Get("/tests/actions/get.temp")
	async getTempTest(@QueryParams() params: { id: string }) {
		if (!params.id) throw new BadRequestError("No id provided");

		const result = await this.testService.getTempTest(params.id);

		return { events: result.events };
	}

	@Get("/projects/:project_id/tests/")
	async getList(@Param("project_id") projectId: number): Promise<IProjectTestsListResponse> {
		return (await this.testService.getTestsInProject(projectId)).map((testData) => {
			const videoUrl = testData.featured_video_uri ? testData.featured_video_uri : null;

			return {
				id: testData.id,
				testName: testData.name,
				meta: testData.meta ? JSON.parse(testData.meta) : null,
				createdAt: new Date(testData.created_at).getTime() / 1000,
				videoUrl: isUsingLocalStorage() && videoUrl ? videoUrl.replace("http://localhost:3001/", "/output/") : videoUrl,
				// @Note: Add support for taking random screenshots in case video is switched off
				imageURL: null,
				// @Note: Hardcoded for now, will be changed later
				isPassing: true,
				// @Note: Hardcoded for now, will be changed later
				firstRunCompleted: true,
				deleted: false,
			};
		});
	}

	@Authorized()
	@Post("/projects/:project_id/tests/actions/run")
	async runProjectTests(@CurrentUser({ required: true }) user, @Param("project_id") projectId: number) {
		return this.testService.runTestsInProject(projectId, user.user_id);
	}

	@Authorized()
	@Post("/tests/:test_id/actions/delete")
	async deleteTest(@CurrentUser({ required: true }) user, @Param("test_id") testId: number) {
		const deleteResult = await this.testService.deleteTest(testId);
		if (!deleteResult.changedRows) throw new BadRequestError("No such test found with given id");

		return "Success";
	}

	// @TODO: Need strict type checks here. (Security Issue)
	@Authorized()
	@Post("/projects/:project_id/tests/actions/create")
	async createTest(
		@CurrentUser({ required: true }) user,
		@Param("project_id") projectId: number,
		@Body() body: Omit<ICreateTestPayload, "projectId" | "userId" | "events"> & { events?: Array<iAction>; tempTestId?: string },
	) {
		const { user_id } = user;

		let events = body.events;
		if (body.tempTestId) {
			const tempTest = await this.testService.getTempTest(body.tempTestId);
			events = tempTest.events;
		}

		if (!events) throw new Error("No events passed");
		if (!body.name) throw new Error("No name passed for the test");

		return this.testService.createTest({
			...body,
			events: events,
			projectId: projectId,
			userId: user_id,
		});
	}

	@Authorized()
	@Post("/tests/:test_id/actions/edit")
	async editTest(@CurrentUser({ required: true }) user, @Param("test_id") testId: number, @Body() body: { name: string }) {
		const result = await this.testService.updateTest(testId, {
			name: body.name,
		});

		return result.changedRows ? "Updated" : "No change";
	}

	@Authorized()
	@Post("/tests/:test_id/actions/update.meta")
	async updateTestMeta(@Param("test_id") testId: number, @Body() body: { meta: any }) {
		if (typeof body.meta !== "object") throw new BadRequestError("meta is not JSON compatible");

		await this.testService.updateMeta(JSON.stringify(body.meta), testId);
		return "Successful";
	}
}