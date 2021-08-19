import { Service } from "typedi";
import { RedisManager as ParentRedisManager } from "@crusher-shared/modules/redis";

import IORedis = require("ioredis");

// @TODO: This should come from where the class is initalized.
function getConnectionObject(): IORedis.RedisOptions {
	if (process.env.REDIS_CONNECTION_STRING) {
		return { path: process.env.REDIS_CONNECTION_STRING };
	}

	return {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : null,
		password: process.env.REDIS_PASSWORD,
	};
}

@Service()
class RedisManager extends ParentRedisManager {
	constructor() {
		super(getConnectionObject());
	}
}

export { RedisManager };
