import mongoose from 'mongoose';
import Logger from './logger';
import config from '../config';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export default async () => {
    if (process.env.NODE_ENV === 'test') {
        const mockUri = await mongod.getUri();
        const connection = await mongoose
            .connect(mockUri, {
                useUnifiedTopology: false,
                useNewUrlParser: false,
                useCreateIndex: true,
                serverSelectionTimeoutMS: 120000,
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
    } else {
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
    }
};
