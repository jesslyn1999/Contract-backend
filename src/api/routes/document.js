import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let documentService = Container.get('documentService');
    let logger = Container.get('logger');
    route.post('/generate_sppbj', (req, res, next) => {
        const { id_template, data_pemenang, data_form } = req.body;
        documentService
            .generateSPPBJ(id_template, data_pemenang, data_form)
            .then(generatedDocument => {
                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=' + 'SPPBJ.pdf',
                );
                res.contentType('application/pdf');
                res.send(generatedDocument);
            })
            .catch(err => {
                logger.error(
                    `[DocumentRoute][GenerateSPPBJ]: Failed to generate SPPBJ. ${err}`,
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
        documentService
            .getAllSppbj()
            .then(generatedDocument => {
                res.contentType('application/json');
                res.send(generatedDocument);
            })
            .catch(err => {
                logger.error(
                    `[DocumentRoute][GetAllSPPBJ]: Failed to get sppbj. ${err}`,
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
        documentService
            .getSppbjByPage(req.params.page, req.query.perpage)
            .then(result => {
                return res.json({
                    data: result[0],
                    pages: result[1],
                });
            })
            .catch(err => {
                logger.error(
                    `[DocumentRoute][Get_SPPBJ_ByPage]: Failed to get sppbj. ${err}`,
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

    app.use('/document', route);
};
