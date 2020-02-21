import { Router } from 'express';

import admin from './routes/admin';
import publicRoute from './routes/public';
import section from './routes/section';

export default () => {
    const app = Router();

    publicRoute(app);
    admin(app);
    section(app);

    return app;
};
