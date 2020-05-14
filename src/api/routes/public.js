import { Router } from 'express';
import passport from 'passport';

const route = Router();

export default app => {
    route.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (!user) {
                return res.send({
                    request: { success: false, message: info },
                    payload: {},
                });
            }

            req.login(user, err => {
                if (err) {
                    return res.send({
                        request: { success: false, message: err },
                        payload: {},
                    });
                }
                let forbidden = [
                    'is_bph',
                    '_id',
                    'password',
                    'createdAt',
                    'updatedAt',
                ];

                let filteredUser = new Object(null);

                for (let key in user.toObject()) {
                    if (!forbidden.includes(key)) {
                        filteredUser[key] = user[key];
                    }
                }

                return res.send({
                    request: { success: true, message: 'Login success!' },
                    payload: filteredUser,
                });
            });
        })(req, res, next);
    });

    // Use no middleware for public route
    app.use('/public', route);
};
