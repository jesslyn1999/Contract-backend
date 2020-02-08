import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import servicesLoader from './services';
import { MongoModels } from '../models';
import Logger from './logger';

export default async ({ expressApp }) => {
    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    await dependencyInjectorLoader({ models: MongoModels });
    Logger.info('✌️ Dependency Injector loaded');

    servicesLoader();
    Logger.info('✌️ Service loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
