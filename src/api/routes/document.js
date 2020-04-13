import { Router } from 'express';
import { Container } from 'typedi';

export default app => {
    let route = Router();
    let documentService = Container.get('documentService');

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
            .catch();
    });

    app.use('/document', route);
};
