import { Container } from 'typedi';
import mongoose from 'mongoose';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

const register = userData => {
    return new Promise(async (resolve, reject) => {
        const userModel = Container.get('userModel');
        const logger = Container.get('logger');
        const bcrypt = Container.get('bcrypt');

        const {
            nama,
            nim,
            bidang,
            divisi,
            deskripsi,
            jabatan_struktural,
            jabatan_eventual,
            solidaritas,
            loyalitas,
            inovatif,
            solutif,
            kebebasan_substansial,
            pemimpin,
            penggerak,
            is_bph,
        } = userData;

        let compressedImgData = await imagemin.buffer(userData.fotobase.data, {
            plugins: [
                imageminPngquant({
                    quality: [0.3, 0.5],
                }),
            ],
        });

        const user = new userModel({
            nama,
            nim,
            password: bcrypt.hashSync(nim, bcrypt.genSaltSync(10)),
            bidang,
            divisi,
            deskripsi,
            jabatan_struktural,
            jabatan_eventual,
            solidaritas,
            loyalitas,
            inovatif,
            solutif,
            kebebasan_substansial,
            pemimpin,
            penggerak,
            fotobase:
                `data:${userData.fotobase.tipe};base64,` +
                Buffer.from(compressedImgData, 'binary').toString('base64'),
            is_bph,
        });

        user.save()
            .then(() => {
                resolve({ success: true });
            })
            .catch(err => {
                logger.error(
                    `[UserService]: Failed to save user instance. ${err}`,
                );
                reject({ success: false, error: err });
            });
    });
};

const getStaff = () => {
    return new Promise((resolve, reject) => {
        const userModel = Container.get('userModel');
        const logger = Container.get('logger');

        userModel
            .find(
                { is_bph: false },
                'nama bidang divisi jabatan_struktural jabatan_eventual solidaritas loyalitas inovatif solutif kebebasan_substansial pemimpin penggerak nim',
            )
            .then(staffs => {
                resolve(staffs);
            })
            .catch(err => {
                logger.error(
                    `[UserService][GetStaff]: Failed to retrieve staff. ${err}`,
                );
                reject(err);
            });
    });
};

const getBph = () => {
    return new Promise((resolve, reject) => {
        const userModel = Container.get('userModel');
        const logger = Container.get('logger');

        userModel
            .find(
                { is_bph: true },
                'nama bidang divisi jabatan_struktural jabatan_eventual solidaritas loyalitas inovatif solutif kebebasan_substansial pemimpin penggerak nim',
            )
            .then(staffs => {
                resolve(staffs);
            })
            .catch(err => {
                logger.error(
                    `[UserService][GetBPH]: Failed to retrieve staff. ${err}`,
                );
                reject(err);
            });
    });
};

const getBestStrain = ({ simple = false, custom_query } = {}) =>
    new Promise((resolve, reject) => {
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        let options = simple ? '_id nama nim' : null;

        if (custom_query) {
            options = custom_query;
        }

        hallOfFameModel
            .findOne({}, 'bestStrain deskripsiBestStrain')
            .lean()
            .populate('bestStrain', options)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[UserService][GetBestStrain]: Failed to retrieve best strain. ${err}`,
                );
                reject(err);
            });
    });

const submitBestStrain = ({ _id, deskripsi }) =>
    new Promise((resolve, reject) => {
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        hallOfFameModel
            .findOneAndUpdate(
                {},
                {
                    bestStrain: mongoose.Types.ObjectId(_id),
                    deskripsiBestStrain: deskripsi,
                },
                {
                    upsert: true,
                    new: true,
                    useFindAndModify: false,
                },
            )
            .then(result => {
                resolve({ success: true, result });
            })
            .catch(err => {
                logger.error(
                    `[UserService][SubmitBestStrain]: Failed to create or update acara. ${err}`,
                );
                reject({ success: false, error: err });
            });
    });

const getBestStaff = ({ simple = false, custom_query } = {}) =>
    new Promise((resolve, reject) => {
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        let options = simple ? '_id nama nim' : null;

        if (custom_query) {
            options = custom_query;
        }

        hallOfFameModel
            .findOne(
                {},
                '-_id Kesekretariatan PSDA Internal Ekskeprof BSO Senator DPA',
            )
            .lean()
            .populate(
                'Kesekretariatan PSDA Internal Ekskeprof BSO Senator DPA',
                options,
            )
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[UserService][GetBestStrain]: Failed to retrieve best strain. ${err}`,
                );
                reject(err);
            });
    });

const submitBestStaff = bestStaff =>
    new Promise((resolve, reject) => {
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        for (let key in bestStaff) {
            bestStaff[key] = mongoose.Types.ObjectId(bestStaff[key]);
        }
        hallOfFameModel
            .findOneAndUpdate(
                {},
                {
                    ...bestStaff,
                },
                {
                    upsert: true,
                    new: true,
                    useFindAndModify: false,
                },
            )
            .then(result => {
                resolve({ success: true, result });
            })
            .catch(err => {
                logger.error(
                    `[UserService][SubmitBestStaff]: Failed to create or update acara. ${err}`,
                );
                reject({ success: false, error: err });
            });
    });

export default {
    register,
    getStaff,
    getBph,
    getBestStrain,
    submitBestStrain,
    getBestStaff,
    submitBestStaff,
};
