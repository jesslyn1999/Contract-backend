import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let sppbjService = Container.get('sppbjService');
    let logger = Container.get('logger');
    route.post('/generate_sppbj', (req, res, next) => {
        const { id_template, data_pemenang, data_form } = req.body;
        sppbjService
            .generateSPPBJ(id_template, data_pemenang, data_form)
            .then(({ binary_data, name }) => {
                res.setHeader(
                    'Content-Disposition',
                    `attachment; filename= ${name}`,
                );
                res.contentType(
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                );
                res.send(binary_data);
            })
            .catch(err => {
                logger.error(
                    `[SppbjRoute][GenerateSPPBJ]: Failed to generate SPPBJ. ${err}`,
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

    route.get('/get_all_sppbj', (req, res, next) => {
        sppbjService
            .getAllSppbj()
            .then(generatedDocument => {
                res.contentType('application/json');
                res.send(generatedDocument);
            })
            .catch(err => {
                logger.error(
                    `[SppbjRoute][GetAllSPPBJ]: Failed to get sppbj. ${err}`,
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

    route.get('/get_sppbj/:page', (req, res) => {
        sppbjService
            .getSppbjByPage(req.params.page, req.query.perpage)
            .then(result => {
                return res.json({
                    data: result[0],
                    pages: result[1],
                });
            })
            .catch(err => {
                logger.error(
                    `[SppbjRoute][Get_SPPBJ_ByPage]: Failed to get sppbj by page. ${err}`,
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

    app.use('/sppbj', route);
};
