import { Router } from 'express';
import { Container } from 'typedi';
import { isAdmin } from '../middlewares/auth';

const route = Router();

export default app => {
    const sectionService = Container.get('sectionService');

    route.post('/', (req, res) => {
        sectionService.createSection(req.body)
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
    });

    route.get('/:page', (req, res) => {
        sectionService.getSections(req.params.page, req.query.perpage, req.query.find)
            .then((result) => {
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
        sectionService.deleteSectionById(req.params.id)
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

    app.use('/section', route);
};