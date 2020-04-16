import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const tagService = Container.get('tagService');
    const logger = Container.get('logger');
    
    route.post('/', (req, res) =>
    {
        tagService
            .setNewTag(req.body.key, req.body.value)
            .then(() =>
            {
                return res.json(
                {
                    request: { success: true, message: null },
                });
            })
            .catch(err =>
            {
                return res.status(500).json(
                {
                    request:
                    {
                        success: false,
                        message: 'Internal server error, report to admin for assistance ${err}\n',
                    },
                });
            });
    });
    
    route.delete('/:key', (req, res) =>
    {
        tagService
            .deleteTag(req.params.key)
            .then(() =>
            {
                return res.json(
                {
                    request: { success: true, message: null },
                });
            })
            .catch(err =>
            {
                return res.status(500).json(
                {
                    request:
                    {
                        success: false,
                        message: 'Internal server error, report to admin for assistance ${err}.\n',
                    },
                });
            });
    });
    
    route.get('/updatetag', (req, res) =>
    {
        tagService
            .updateTag(req.query.key, req.body.oldValue, req.body.newValue)
            .then(() =>
            {
                return res.json(
                {
                    request: { success: true, message: null },
                });
            })
            .catch(err =>
            {
                return res.status(500).json(
                {
                    request:
                    {
                        success: false,
                        message: 'Internal server error, report to admin for assistance ${err}.\n',
                    },
                });
            });
    });

    app.use('/tag', route);
};