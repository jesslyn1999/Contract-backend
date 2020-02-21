import { Container } from 'typedi';

const getSections = (page, perPage, query) => {
    page = page || 1;
    perPage = parseInt(perPage) || 9;
    if (query == undefined) query = '';
    return new Promise( async(resolve, reject) => {
        const sectionModelInstance = Container.get('sectionModel');
        const logger = Container.get('logger');

        const sectionsCount = await sectionModelInstance.countDocuments({});
        sectionModelInstance
            .find({
                    'title': {
                        '$regex': query,
                        '$options': 'i'
                    }
                },
                'title content')
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

const deleteSection = ({_title, _content}) => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');

        sectionModel.deleteOne({title: _title, content: _content}, function (err) {
            if (err) return handleError (err);
        });
    });
};


export default {
    getSections,
    createSection,
    deleteSection,
};