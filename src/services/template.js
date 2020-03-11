import { Container } from 'typedi';

const getAllTemplate = () => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.find({}, fucntion(err, docs) {
            if (err) {
                reject(err);
            }
            else {
                resolve({success: true});
                console.log(docs);
            }
        });
    });
}

const createTemplateCreator = ({_title, _description, _content}) => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');
        const newTemplate = new templateModel ({
            title: _title,
            description: _description,
            content: _content,
        });
        
        newTemplate.save(function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({success: true});
            }
        });
    });
}

const deleteTemplateCreator = _id => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndRemove(_id, function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({success: true});
            }
        });
    });
}

const updateTemplateTitle = ({_id, _title}) => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndUpdate(_id, { title: _title }, function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({success: true});
            }
        });
    });
}

const updateTemplateDescription = ({_id, _description}) => {
    return new Promise((resolve, reject) => {
        const templateModel = Container.get('templateModel');

        templateModel.findByIdAndUpdate(_id, { description: _description }, function(err) {
            if (err) {
                reject(err);
            }
            else {
                resolve({success: true});
            }
        });
    });
}

export
{
    getTemplate,
    createTemplateCreator,
    deleteTemplateCreator,
    updateTemplateTitle,
    updateTemplateDescription,
}