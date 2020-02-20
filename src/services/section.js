import { Container } from 'typedi';

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
    createSection
};