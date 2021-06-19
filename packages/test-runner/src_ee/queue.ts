import * as path from "path";
import { Worker, Queue, QueueScheduler } from "bullmq";
import { REDDIS } from "../config/database";
import { BootAfterNJobsOffsetManager } from "./manager/offsetManger";
import * as fs from "fs";

const REQUEST_QUEUE = "request-queue";
const queue = new Queue(REQUEST_QUEUE, { connection: REDDIS as any });

queue.client.then(async (client) => {
	const queueScheduler = new QueueScheduler(REQUEST_QUEUE, {
		stalledInterval: 120000,
		maxStalledCount: 1,
		connection: client,
	});
	await queueScheduler.waitUntilReady();

	const workerPath = fs.existsSync(path.resolve(__dirname, "./worker.js")) ? path.resolve(__dirname, "./worker.js") : path.resolve("src/worker.ts");

	new Worker(REQUEST_QUEUE, workerPath, {
		connection: client,
		concurrency: 3,
		lockDuration: 120000,
		getOffset: BootAfterNJobsOffsetManager.get,
	} as any);
});