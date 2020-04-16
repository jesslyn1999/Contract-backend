import { Container } from 'typedi';

const getAllTag = id_template => {
    return new Promise((resolve, reject) => {
        const templateService = Container.get('templateService');
        templateService
            .getTemplateById(id_template)
            .then(res => {
                let listOfTag = new Set(),
                    pattern;
                const { content } = res;
                let m;
                pattern = /&lt;&lt;set:(.*?)&gt;&gt/g;
                while ((m = pattern.exec(content)) !== null) {
                    listOfTag.add(m[1]);
                }
                resolve(Array.from(listOfTag));
            })
            .catch(reject);
    });
};

export default {
    getAllTag,
};
