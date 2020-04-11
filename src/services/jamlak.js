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

export default {
    getJamlak,
};
