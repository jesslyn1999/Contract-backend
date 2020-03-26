import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const templateService = Container.get('templateService');
    const logger = Container.get('logger');

    route.post('/', (req, res) => {
        if (!req.body.id) {
            templateService
                .createTemplateCreator(req.body)
                .then(() => {
                    return res.json({
                        request: { success: true, message: null },
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        request: {
                            success: false,
                            message:
                                'Internal server error, report to admin for assistance',
                        },
                    });
                });
        }
        templateService
            .updateTemplateDescription(req.body)
            .then(() => {
                return res.json({
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
                        err,
                    },
                });
            });
    });
    
    route.get('/all', (req, res) => {
        templateService
            .getAllTemplate()
            .then(result => {
                return res.send(result);
            })
            .catch(err => {
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
                    },
                });
            });
    });


    route.get('/:page', (req, res) => {
        templateService
            .getTemplate(req.params.page, req.query.perpage, req.query.find)
            .then(result => {
                return res.json({
                    data: result[0],
                    pages: result[1],
                });
            })
            .catch(err => {
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
                    },
                });
            });
    });

    route.delete('/:id', (req, res) => {
        templateService
            .deleteTemplateCreator(req.params.id)
            .then(() => {
                return res.json({
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance\n' +
                            err,
                    },
                });
            });
    });

    app.use('/template', route);
};
