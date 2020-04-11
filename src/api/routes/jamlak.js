import { Router } from 'express';
import { Container } from 'typedi';

const route = Router();

export default app => {
    const jamlakService = Container.get('jamlakService');
    const logger = Container.get('logger');

    // Get Jamlak
    route.get('/getjamlak/:nomor_jamlak', (req, res) => {
        let nomor_jamlak = req.params.nomor_jamlak;
        jamlakService
            .getJamlak(nomor_jamlak)
            .then(data_jamlak => {
                return res.json({
                    data: data_jamlak,
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                logger.error(
                    `[JamlakRoute][GetJamlak]: Failed to get jamlak. ${err}`,
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
                    
    route.post('/', (req, res) => {
        jamlakService
            .saveJamlak(req.body)
            .then(() => {
                return res.json({
                    request: { success: true, message: null },
                });
            })
            .catch(err => {
                logger.error(
                    `[JamlakRoute][GetJamlak]: Failed to get jamlak. ${err}`,
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

    app.use('/jamlak', route);
};
