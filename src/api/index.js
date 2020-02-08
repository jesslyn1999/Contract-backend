import { Router } from 'express';

import admin from './routes/admin';
import publicRoute from './routes/public';

export default () => {
    const app = Router();

    publicRoute(app);
    admin(app);

    return app;
};
