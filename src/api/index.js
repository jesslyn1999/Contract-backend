import { Router } from 'express';

import admin from './routes/admin';
import publicRoute from './routes/public';
import section from './routes/section';
import template from './routes/template';
import jamlak from './routes/jamlak';
import document from './routes/document';

export default () => {
    const app = Router();

    publicRoute(app);
    admin(app);
    section(app);
    template(app);
    jamlak(app);
    document(app);

    return app;
};
