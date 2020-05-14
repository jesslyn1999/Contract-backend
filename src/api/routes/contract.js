import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let contractService = Container.get('contractService');
    let logger = Container.get('logger');
    route.post('/generate_contract', (req, res, next) => {
        const { id_template, id_sppbj, id_jamlak, data_form } = req.body;
        contractService
            .generateContract(id_template, id_sppbj, id_jamlak, data_form)
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
                    `[ContractRoute][GenerateSPPBJ]: Failed to generate contract. ${err}`,
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

    route.get('/get_all_contract', (req, res, next) => {
        contractService
            .getAllContract()
            .then(generatedDocument => {
                res.contentType('application/json');
                res.send(generatedDocument);
            })
            .catch(err => {
                logger.error(
                    `[ContractRoute][GetAllContract]: Failed to get all contract. ${err}`,
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

    route.get('/get_contract/:page', (req, res) => {
        contractService
            .getContractByPage(req.params.page, req.query.perpage)
            .then(result => {
                return res.json({
                    data: result[0],
                    pages: result[1],
                });
            })
            .catch(err => {
                logger.error(
                    `[ContractRoute][Get_Contract_ByPage]: Failed to get contract by page. ${err}`,
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

    route.get('/download/:id', (req, res) => {
        contractService
            .download(req.params.id)
            .then(({ name, binary_data }) => {
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
                    `[ContractRoute][Download]: Failed to get contract for download. ${err}`,
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

    app.use('/contract', route);
};
