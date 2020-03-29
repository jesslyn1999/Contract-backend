import { Container } from 'typedi';

const getAllTemplate = () => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.find({}, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
                console.log(docs);
            }
        });
    });
};

const getTemplate = (page, perPage, query) => {
    page = page || 1;
    perPage = parseInt(perPage) || 9;
    if (query == undefined) query = '';
    return new Promise(async (resolve, reject) => {
        const templateModel = Container.get('templateModel');
        const logger = Container.get('logger');

        const templatesCount = await templateModel.countDocuments({});
        templateModel
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
                const pages = Math.ceil(templatesCount / perPage);
                resolve([result, pages]);
            })
            .catch(err => {
                logger.error(
                    `[TemplateService][GetTemplate]: Failed to get template by pages. ${err}`,
                );
                reject(err);
            });
    });
};

const createTemplateCreator = templateData => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');
        const newTemplate = new templateModel(templateData);

        newTemplate.save(function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const deleteTemplate = _id => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndRemove(_id, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const updateTemplateTitle = ({ _id, _title }) => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndUpdate(_id, { title: _title }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const updateTemplateDescription = ({ _id, _description }) => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndUpdate(
            _id,
            { description: _description },
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            },
        );
    });
};

export default {
    getAllTemplate,
    createTemplateCreator,
    getTemplate,
    deleteTemplate,
    updateTemplateTitle,
    updateTemplateDescription,
};
