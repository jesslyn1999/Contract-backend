import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import passport from 'passport';
import configurePasport from './passport';
import configureSession from './session';

export default ({ app }) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    configureSession(app);
    configurePasport(passport);

    app.use(passport.initialize());
    app.use(passport.session());

    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all origins by deinult
    let corsOptions = { credentials: true, origin: true };
    app.use(cors(corsOptions));

    // Load API routes << Important
    app.use(config.api.prefix, routes());

    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    // Error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
