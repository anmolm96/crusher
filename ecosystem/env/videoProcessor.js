const { IS_PRODUCTION, AWS_CONFIG, REDIS_CONFIG, THIRD_PARTY_API_KEYS, MONGODB_CONFIG } = require('../config');

module.exports = {
	VIDEO_PROCESSOR_ENV: {
		NODE_ENV: IS_PRODUCTION ? 'production' : 'development',
		/* Video Processor MongoDB config */
		MONGODB_CONNECTION_STRING: MONGODB_CONFIG.CONNECTION_STRING ? MONGODB_CONFIG.CONNECTION_STRING : null,
		MONGODB_HOST: MONGODB_CONFIG.HOST,
		MONGODB_PORT: MONGODB_CONFIG.PORT,
		MONGODB_USERNAME: MONGODB_CONFIG.USERNAME,
		MONGODB_PASSWORD: MONGODB_CONFIG.PASSWORD,
		MONGODB_DATABASE: MONGODB_CONFIG.DATABASE,
		/* Redis DB config */
		REDIS_CONNECTION_STRING: REDIS_CONFIG.CONNECTION_STRING ? REDIS_CONFIG.CONNECTION_STRING : null,
		REDIS_HOST: REDIS_CONFIG.HOST,
		REDIS_PORT: REDIS_CONFIG.PORT,
		REDIS_PASSWORD: REDIS_CONFIG.PASSWORD,
		/* LogDNA config */
		LOGDNA_API_KEY: THIRD_PARTY_API_KEYS.LOGDNA,
		/* AWS config */
		AWS_ACCESS_KEY_ID: AWS_CONFIG.AWS_ACCESS_KEY_ID,
		AWS_S3_REGION: AWS_CONFIG.AWS_S3_REGION,
		AWS_S3_VIDEO_BUCKET: AWS_CONFIG.AWS_S3_VIDEO_BUCKET,
		AWS_SECRET_ACCESS_KEY: AWS_CONFIG.AWS_SECRET_ACCESS_KEY,
	},
};
