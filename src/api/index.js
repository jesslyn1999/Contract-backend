import { Router } from 'express';

import admin from './routes/admin';
import publicRoute from './routes/public';
import section from './routes/section';
import template from './routes/template';

export default () => {
    const app = Router();

    publicRoute(app);
    admin(app);
    section(app);
    template(app);

    return app;
};
