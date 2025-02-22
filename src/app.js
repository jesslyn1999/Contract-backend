require('@babel/register');

import config from './config';
import express from 'express';
import Logger from './loaders/logger';
import mainLoader from './loaders';

const app = express();

async function startServer() {
    await mainLoader({ expressApp: app });

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
        Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    });
}

startServer();

module.exports = app;
