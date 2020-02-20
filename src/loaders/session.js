import session from 'express-session';
import MongoStoreModule from 'connect-mongo';
import uuid from 'uuid/v4';
import mongoose from 'mongoose';

const createSessionConfiguration = () => {
    const MongoStore = MongoStoreModule(session);

    return session({
        genid: () => uuid(), // use UUIDs for session IDs
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 2 * 24 * 3600 * 1000,
        },
    });
};

export default createSessionConfiguration;
