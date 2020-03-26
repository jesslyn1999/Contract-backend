import bcrypt from 'bcryptjs';
import { Container } from 'typedi';
import LocalStrategyModule from 'passport-local';
import mongoose from 'mongoose';

const enablePassport = app => {
    const userModel = Container.get('userModel');
    const passport = Container.get('passport');

    passport.use(
        new LocalStrategyModule.Strategy(
            { usernameField: 'username' },
            async (username, password, done) => {
                // Matching user
                let user = await userModel.findOne({
                    username: username,
                });

                if (!user) {
                    return done(null, false, {
                        message: 'User is not registered',
                    });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect',
                        });
                    }
                });
            },
        ),
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((_id, done) => {
        userModel.findOne(
            { _id: mongoose.Types.ObjectId(_id) },
            (err, user) => {
                done(err, user);
            },
        );
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

export default enablePassport;
