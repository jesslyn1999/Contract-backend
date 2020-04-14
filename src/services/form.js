import { Container } from 'typedi';

const getAllTag = (id_template, listOfTag) => {
    return new Promise((resolve, reject) => {
        let templateService = Container.get('templateService');

        var items, pattern, str, result;
        listOfTag = [];
        str = templateService.getTemplateById(id_template);

        pattern = /:(\w+)>>/g;
        result = pattern.exec(str);

        while (result != null) {
            listOfTag.push(result[1]);
        }

        if (err) {
            reject(err);
        } else {
            resolve(listOfTag);
        }
    });
};

export default {
    getAllTag,
};
