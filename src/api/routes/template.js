import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const templateService = Container.get('templateService');
    const logger = Container.get('logger');

    route.post('/newtemplate', (req, res) => {
        templateService
            .createNewTemplate(req.body)
            .then(() => {
                return res.json({
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                logger.error(
                    `[TemplateRoute][NewTemplate]: Failed to save new template into database. ${err}`,
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

    app.use('/template', route);
};
