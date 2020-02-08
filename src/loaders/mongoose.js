import mongoose from 'mongoose';
import Logger from './logger';
import config from '../config';

export default async () => {
    const connection = await mongoose
        .connect(config.databaseUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
            family: 4,
            poolSize: 10,
        })
        .catch(err => {
            Logger.error(
                `[MongooseLoader]: Failed to connect to database. ${err}`,
            );
            process.exit(1);
        });

    return connection.connection.db;
};
