import { Container } from 'typedi';

const getSections = (page, perPage) => {
    page = page || 1;
    perPage = perPage || 9;
    return new Promise( async(resolve, reject) => {
        const sectionModelInstance = Container.get('sectionModel');
        const logger = Container.get('logger');

        const sectionsCount = await sectionModelInstance.countDocuments({});
        sectionModelInstance
            .find({}, 'title content')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then(result => {
                const pages = Math.ceil(sectionsCount / perPage);
                resolve([result, pages]);
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

        const newSection = new sectionModel({
            title : title,
            content : content,
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
    getSections,
    createSection,
};