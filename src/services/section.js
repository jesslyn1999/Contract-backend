import { Container } from 'typedi';

const getAllSections = () => {
    return new Promise( async(resolve, reject) => {
        const sectionModelInstance = Container.get('sectionModel');
        const logger = Container.get('logger');

        sectionModelInstance
            .find()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[SectionService][GetAllSections]: Failed to get all sections. ${err}`,
                );
                reject(err);
            });
    });
}

export default {
    getAllSections,
};