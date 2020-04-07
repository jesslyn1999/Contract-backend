import { Container } from 'typedi';

const setNewTag = (keyString, valueString) =>
{
    return new Promise((resolve, reject) =>
    {
        const tagModelInstance = Container.get('tagModel');
        
        const newTag = new tagModel
        ({
            key: keyString,
            value: valueString,
        });
        
        newTag.save(err =>
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve({success: true});
            }
        });
    });
}