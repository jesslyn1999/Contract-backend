import { Container } from 'typedi';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import LoggerInstance from './logger';
import passport from 'passport';

export default ({ models }) => {
    try {
        models.forEach(model => {
            Container.set(model.name, model.model);
        });

        Container.set('passport', passport);
        Container.set('logger', LoggerInstance);
        Container.set('multer', multer);
        Container.set('bcrypt', bcrypt);
    } catch (e) {
        LoggerInstance.error('Error on dependency injector loader');
        throw e;
    }
};
