import { Router } from 'express';
import { Container } from 'typedi';
import { isAdmin } from '../middlewares/auth';

const route = Router();

export default app => {
    const sectionService = Container.get('sectionServices');

    route.post('/createsection',(req,res) => {
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
    })

};