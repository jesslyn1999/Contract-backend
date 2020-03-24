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

const createNewTemplate = templateData => {
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
    createNewTemplate,
    deleteTemplate,
    updateTemplateTitle,
    updateTemplateDescription,
};
