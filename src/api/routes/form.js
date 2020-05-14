import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let formService = Container.get('formService');
    let logger = Container.get('logger');

    route.get('/alltag', (req, res) => {
        const { id_template } = req.query;
        formService
            .getAllTag(id_template)
            .then(listAllTag => {
                res.json({
                    success: true,
                    message: null,
                    data: listAllTag,
                });
            })
            .catch(err => {
                logger.error(
                    `[FormRoute][AllTag]: Failed to getAllTag. ${err}`,
                );
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance' +
                            err,
                    },
                });
            });
    });

    app.use('/form', route);
};
