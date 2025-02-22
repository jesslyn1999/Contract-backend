import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const templateService = Container.get('templateService');
    const logger = Container.get('logger');

    route.post('/', (req, res) => {
        if (!req.body._id) {
            templateService
                .createTemplateCreator(req.body)
                .then(() => {
                    return res.json({
                        request: { success: true, message: null },
                    });
                })
                .catch(err => {
                    logger.error(
                        `[TemplateRoute][CreateNewTemplate]: Failed to save new template. ${err}`,
                    );
                    return res.status(500).json({
                        request: {
                            success: false,
                            message:
                                'Internal server error, report to admin for assistance',
                        },
                    });
                });
            return;
        }
        templateService
            .updateTemplate(req.body)
            .then(() => {
                return res.json({
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                logger.error(
                    `[TemplateRoute][UpdateTemplate]: Failed to update template. ${err}`,
                );
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
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
                logger.error(
                    `[TemplateRoute][GetAllTemplate]: Failed to get all template. ${err}`,
                );
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
                logger.error(
                    `[TemplateRoute][GetByPagination]: Failed to get by pagination. ${err}`,
                );
                return res.status(500).json({
                    request: {
                        success: false,
                        message:
                            'Internal server error, report to admin for assistance',
                    },
                });
            });
    });

    route.get('/', (req, res) => {
        templateService
            .getTemplateById(req.query.id)
            .then(result => {
                return res.json({ success: true, message: null, data: result });
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

    route.delete('/:id', (req, res) => {
        templateService
            .deleteTemplate(req.params.id)
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
