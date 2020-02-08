import { Container } from 'typedi';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import { performance } from 'perf_hooks';

const submitOrganogram = ({ organogram }) => {
    return new Promise(async (resolve, reject) => {
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        let compressedImgData = await imagemin.buffer(organogram.data, {
            plugins: [
                imageminPngquant({
                    quality: [0.3, 0.5],
                }),
            ],
        });
        hallOfFameModel
            .findOneAndUpdate(
                {},
                {
                    organogram:
                        `data:${organogram.tipe};base64,` +
                        Buffer.from(compressedImgData, 'binary').toString(
                            'base64',
                        ),
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
                    `[AdminService][SubmitOrganogram]: Failed to create or update acara. ${err}`,
                );
                reject({ success: false, error: err });
            });
    });
};

const getOrganogram = () =>
    new Promise((resolve, reject) => {
        var t0 = performance.now();
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        hallOfFameModel
            .findOne({}, '-_id organogram')
            .lean()
            .then(result => {
                var t1 = performance.now();
                // console.log(
                //     'Call to getOrganogram took ' +
                //         (t1 - t0) +
                //         ' milliseconds.',
                // );
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[AdminService][GetOrganogram]: Failed to retrieve organogram. ${err}`,
                );
                reject(err);
            });
    });

const getHallOfFameData = () =>
    new Promise((resolve, reject) => {
        var t0 = performance.now();
        const hallOfFameModel = Container.get('hallOfFameModel');
        const logger = Container.get('logger');

        hallOfFameModel
            .findOne(
                {},
                '-_id organogram bestStrain deskripsiBestStrain Kesekretariatan PSDA Internal Ekskeprof BSO Senator DPA',
            )
            .lean()
            .populate(
                'bestStrain Kesekretariatan PSDA Internal Ekskeprof BSO Senator DPA',
                '-_id nama fotobase nim',
            )
            .then(result => {
                var t1 = performance.now();
                // console.log(
                //     'Call to getOrganogram took ' +
                //         (t1 - t0) +
                //         ' milliseconds.',
                // );
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[AdminService][GetHallOfFameData]: Failed to retrieve organogram. ${err}`,
                );
                reject(err);
            });
    });

export default {
    submitOrganogram,
    getOrganogram,
    getHallOfFameData,
};
