import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const sectionService = Container.get('sectionService');
    const logger = Container.get('logger');

    route.post('/', (req, res) => {
        if (!req.body.id) {
            sectionService
                .createSection(req.body)
                .then(() => {
                    return res.json({
                        request: { success: true, message: null },
                    });
                })
                .catch(err => {
                    logger.error(
                        `[SectionRoute][CreateSection]: Failed to create section`,
                        err,
                    );
                    return res.status(500).json({
                        request: {
                            success: false,
                            message:
                                'Internal server error, report to admin for assistance',
                        },
                    });
                });
        }
        sectionService
            .updateSection(req.body)
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

    route.get('/', (req, res) => {
        sectionService
            .getSectionById(req.query.id)
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

    route.get('/all', (req, res) => {
        sectionService
            .getAllSections(req.query.keyword)
            .then(result => {
                return res.send(result);
            })
            .catch(err => {
                logger.error(
                    `[SectionRoute][GetAllSection]: Failed to getAllSection`,
                    err,
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
        sectionService
            .getSections(req.params.page, req.query.perpage, req.query.find)
            .then(result => {
                return res.json({
                    data: result[0],
                    pages: result[1],
                });
            })
            .catch(err => {
                logger.error(
                    `[SectionRoute][GetSectionbyPage]: Failed to get section by page`,
                    err,
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

    route.delete('/:id', (req, res) => {
        sectionService
            .deleteSectionById(req.params.id)
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
