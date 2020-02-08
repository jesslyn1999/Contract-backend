import { Router } from 'express';
import { Container } from 'typedi';
import { isAdmin } from '../middlewares/auth';
import { Transform } from 'json2csv';
import { performance } from 'perf_hooks';
const route = Router();

export default app => {
    const adminService = Container.get('adminService');
    const userService = Container.get('userService');
    const logger = Container.get('logger');

    const multer = Container.get('multer');
    const memoryStorage = multer.memoryStorage();
    const uploadMiddleware = multer({ storage: memoryStorage });

    // Submit Organogram
    route.post(
        '/submitorganogram',
        uploadMiddleware.single('organogram'),
        (req, res) => {
            adminService
                .submitOrganogram({
                    organogram: {
                        data: req.file.buffer,
                        tipe: req.file.mimetype,
                    },
                })
                .then(() => {
                    return res.json({
                        request: { success: true, message: null },
                    });
                })
                .catch(err => {
                    logger.error(
                        `[AdminRoute][SubmitOrganogram]: Failed to save organogram image. ${err}`,
                    );
                    return res.status(500).json({
                        request: {
                            success: false,
                            message:
                                'Internal server error, report to admin for assistance',
                        },
                    });
                });
        },
    );

    route.get('/getallanggotacsv', (req, res) => {
        const userModel = Container.get('userModel');
        let userStream = userModel
            .find()
            .select('-fotobase -password -__v')
            .cursor({ transform: JSON.stringify });

        const json2csv = new Transform();

        userStream.pipe(json2csv).pipe(res.attachment('all_anggota.csv'));
    });

    app.use('/admin', isAdmin, route);
};
