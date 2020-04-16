import { Router } from 'express';

import admin from './routes/admin';
import publicRoute from './routes/public';
import section from './routes/section';
import template from './routes/template';
import jamlak from './routes/jamlak';
import sppbj from './routes/sppbj';
import form from './routes/form';
import contract from './routes/contract';

export default () => {
    const app = Router();

    publicRoute(app);
    admin(app);
    section(app);
    template(app);
    jamlak(app);
    sppbj(app);
    form(app);
    contract(app);

    return app;
};
