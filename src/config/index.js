import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// if test or heroku, read env from CI predefined environment
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'heroku') {
    const configLoading = dotenv.config({ path: `${__dirname}/../../.env` });

    if (configLoading.error) {
        throw new Error('Could not find env file! Server is closing!');
    }
}

export default {
    port: parseInt(process.env.PORT, 10),
    databaseUrl: process.env.MONGODB_URI,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: process.env.API_PREFIX,
    },
};
