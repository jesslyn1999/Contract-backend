import { Container } from 'typedi';

const getJamlak = no_jamlak => {
    return new Promise(async (resolve, reject) => {
        const jamlakModelInstance = Container.get('jamlakModel');
        const logger = Container.get('logger');

        jamlakModelInstance
            .find(
                {
                    no_jamlak,
                },
                'title description content',
            )
            .then(result => {
                if (result.length <= 0) {
                    throw new Error('No matching jamlak is found!');
                }
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[JamlakService][GetJamlak]: Failed to get jamlak by nomor. ${err}`,
                );
                reject(err);
            });
    });
};

const getJamlakByNomorSppbj = no_sppbj => {
    return new Promise(async (resolve, reject) => {
        const jamlakModelInstance = Container.get('jamlakModel');
        const logger = Container.get('logger');

        jamlakModelInstance
            .find({
                no_sppbj: no_sppbj,
            })
            .select('-createdAt -updatedAt -__v')
            .then(resolve)
            .catch(err => {
                logger.error(
                    `[JamlakService][GetJamlakByNomorSppbj]: Failed to get jamlak by nomor sppbj. ${err}`,
                );
                reject(err);
            });
    });
};

const saveJamlak = jamlakData => {
    return new Promise((resolve, reject) => {
        const jamlakModel = Container.get('jamlakModel');
        const newJamlak = new jamlakModel(jamlakData);

        newJamlak.save(function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const updateJamlak = ({ _id, ...newJamlakData }) => {
    return new Promise((resolve, reject) => {
        const jamlakModel = Container.get('jamlakModel');
        jamlakModel.findById(_id, (err, oldJamlak) => {
            Object.keys(newJamlakData).forEach(key => {
                oldJamlak[key] = newJamlakData[key];
            });
            oldJamlak.save(function(err) {
                if (err) {
                    return reject();
                }
                resolve();
            });
        });
    });
};

export default {
    getJamlak,
    saveJamlak,
    updateJamlak,
    getJamlakByNomorSppbj,
};
