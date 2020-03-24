import { Container } from 'typedi';

const getAllSections = (keyword = '') => {
    return new Promise((resolve, reject) => {
        const sectionModelInstance = Container.get('sectionModel');
        const logger = Container.get('logger');

        sectionModelInstance
            .find({
                title: {
                    $regex: keyword,
                },
            })
            .select('-createdAt -updatedAt -__v -_id')
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
};

const getSections = (page, perPage, query) => {
    page = page || 1;
    perPage = parseInt(perPage) || 9;
    if (query == undefined) query = '';
    return new Promise(async (resolve, reject) => {
        const sectionModelInstance = Container.get('sectionModel');
        const logger = Container.get('logger');

        const sectionsCount = await sectionModelInstance.countDocuments({});
        sectionModelInstance
            .find(
                {
                    title: {
                        $regex: query,
                        $options: 'i',
                    },
                },
                'title description content',
            )
            .skip(perPage * page - perPage)
            .limit(perPage)
            .then(result => {
                const pages = Math.ceil(sectionsCount / perPage);
                resolve([result, pages]);
            })
            .catch(err => {
                logger.error(
                    `[SectionService][GetSections]: Failed to get sections by pages. ${err}`,
                );
                reject(err);
            });
    });
};

const getSectionById = id => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');
        sectionModel
            .findById(id)
            .then(resolve)
            .catch(reject);
    });
};

const createSection = ({ title, content, description }) => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');

        const newSection = new sectionModel({
            title: title,
            description: description,
            content: content,
        });
        newSection.save(err => {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const updateSection = ({ id, title, description, content }) => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');
        const newSection = {
            title: title,
            description: description,
            content: content,
        };
        sectionModel
            .findByIdAndUpdate(id, newSection)
            .then(resolve)
            .catch(reject);
    });
};

const deleteSection = ({ _title, _content }) => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');

        sectionModel.deleteOne({ title: _title, content: _content }, function(
            err,
        ) {
            if (err) return handleError(err);
        });
    });
};

const deleteSectionById = id => {
    return new Promise((resolve, reject) => {
        const sectionModel = Container.get('sectionModel');

        sectionModel.findByIdAndRemove(id, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

export default {
    getAllSections,
    getSections,
    getSectionById,
    createSection,
    deleteSection,
    deleteSectionById,
    updateSection,
};
