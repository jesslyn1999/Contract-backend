import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let formService = Container.get('formService');
    let logger = Container.get('logger');

    route.get('/alltag', (req, res) => {
        var listAllTag = [];
        formService
            .getAllTag(req.query.id_template, listAllTag)
            .then(listAllTag => {
                res.send(listAllTag);
            })
            .catch(err => {
                logger.error('[FormRoute][AllTag]: Failed. ${err}');
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
                    },
                });
            });
    });

    app.use('/form', route);
};