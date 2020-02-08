import session from 'express-session';
import MongoStoreModule from 'connect-mongo';
import uuid from 'uuid/v4';
import mongoose from 'mongoose';

const configureSession = app => {
    const MongoStore = MongoStoreModule(session);

    app.use(
        session({
            genid: () => uuid(), // use UUIDs for session IDs
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                domain: process.env.FRONTEND_DOMAIN,
                path: '/',
                secure: false,
                httpOnly: false,
                maxAge: 2 * 24 * 3600 * 1000,
            },
        }),
    );
};

export default configureSession;
