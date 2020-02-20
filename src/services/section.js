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

const createSection = ({title , content}) => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');

        let newSection = new sectionModel({
            title : title,
            content : content
        });
        newSection.save((err) => {
            if (err) {
                reject(err);
            }else{
                resolve({ success : true });
            }
        })
    })
}

export default {
    getAllSections,
    createSection,
};