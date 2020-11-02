import { Queue } from 'bullmq';

import { REDDIS } from '../../../config/database';
import { RunJobRequestBody } from '../interfaces/RunJobRequestBody';
import { RunRequest } from '../interfaces/RunRequest';
import TestInstanceService from '../services/TestInstanceService';
import { replaceHostInCode } from './helper';
import { InstanceStatus } from '../interfaces/InstanceStatus';
import { TEST_INSTANCE_PLATFORM, TEST_TYPES } from '../../constants';
import { Platform } from '../interfaces/Platform';
import DraftInstanceService from '../services/DraftInstanceService';
import { TestType } from '../interfaces/TestType';
import { JobLogs } from '../../server/models/jobLogs';
import * as mongoose from 'mongoose';
import { TestLogsService } from '../services/mongo/testLogs';
import CodeGenerator from 'code-generator';
import { Logger } from '../../utils/logger';
import * as chalk from 'chalk';

const path = require('path');

const testInstanceService = new TestInstanceService();
const draftInstanceService = new DraftInstanceService();

const requestQueue = new Queue('request-queue', {
	// @ts-ignore
	connection: REDDIS,
});
const codeGenerator = new CodeGenerator();

function getGeneratedCode(test, platform, testType) {
	return codeGenerator.generate(JSON.parse(test.events), platform === TEST_INSTANCE_PLATFORM.CHROME, true);
}

export async function addTestRequestToQueue(testRequest: RunRequest) {
	const { test, job } = testRequest;
	const testLogsService = new TestLogsService();
	Logger.debug('Queue::addTestToQueue', chalk.hex('#0b2ce2').bold(`Got a request for test run :`), [test, job]);

	let instanceId = 0;
	const { host } = job ? job : ({} as any);

	const generatedCode = getGeneratedCode(
		test,
		testRequest.job ? testRequest.job.platform : Platform.CHROME,
		testRequest.test.testType,
	);

	const finalCode = generatedCode;

	if (test.testType !== TestType.DRAFT && job) {
		const instance = await testInstanceService.createNewTestInstance({
			jobId: job.id,
			testId: test.id,
			status: InstanceStatus.QUEUED,
			host: job.host ? job.host : 'none',
			code: finalCode,
			platform: job.platform ? job.platform : TEST_INSTANCE_PLATFORM.CHROME,
		});

		instanceId = instance.insertId;
	} else {
		const instance = await draftInstanceService.createNewDraftInstance({
			draft_id: test.id,
			status: InstanceStatus.QUEUED,
			code: finalCode,
			platform: job && job.platform ? job.platform : Platform.CHROME,
		});
		instanceId = instance.insertId;
	}

	const client = await requestQueue.client;
	if (job) {
		await client.set(`${job.id}:completed`, '0');
		await client.set(`${job.id}:started`, '0');
	}
	testLogsService.init(test.id, instanceId, test.testType, job ? job.id : -1);
	await testLogsService.notifyTestAddedToQueue();

	testRequest.test.code = finalCode;

	await requestQueue.add(test.id.toString(), { ...testRequest, instanceId: instanceId }, { lifo: false });
}

export async function addJobToRequestQueue(job) {
	const {
		jobId,
		prId,
		branchName,
		repoName,
		commitId,
		projectId,
		trigger,
		jobStatus,
		host,
		githubInstallationId,
		platform,
		tests,
		testType,
		githubCheckRunId,
	} = job;
	const jobDetails: RunJobRequestBody = {
		id: jobId,
		prId,
		branchName,
		repoName,
		commitId,
		projectId,
		trigger,
		status: jobStatus,
		host,
		githubInstallationId,
		githubCheckRunId,
		platform,
		testCount: tests ? (platform === Platform.ALL ? tests.length * 3 : tests.length) : 0,
	};

	for (let test of tests) {
		Logger.debug('addJobToRequestQueue', 'Inside a test loop', {
			test: test,
			platform,
		});

		if (platform === Platform.ALL) {
			await addTestRequestToQueue({
				job: { ...jobDetails, platform: Platform.CHROME },
				test: { ...test, testType: testType },
			});
			await addTestRequestToQueue({
				job: { ...jobDetails, platform: Platform.SAFARI },
				test: { ...test, testType: testType },
			});
			await addTestRequestToQueue({
				job: { ...jobDetails, platform: Platform.FIREFOX },
				test: { ...test, testType: testType },
			});
		} else {
			await addTestRequestToQueue({
				job: jobDetails,
				test: { ...test, testType: testType },
			});
		}
	}
	Logger.debug('addJobToRequestQueue', 'Time to send logs');
	await new JobLogs({
		tag: 'TESTS_QUEUED_FOR_JOB',
		message: `${tests.length * (platform === Platform.ALL ? 3 : 1)} tests added to queue`,
		jobId: jobId,
	}).save(function (err) {
		if (err) {
			Logger.debug('addJobToRequestQueue', 'We got an error period', { err });
			console.error(err);
		}
	});
}
