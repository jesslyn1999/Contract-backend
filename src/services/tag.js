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
};

const deleteTag = (keyString) =>
{
    return new Promise((resolve, reject) =>
    {
        const tagModelInstance = Container.get('tagModel');
        
        tagModelInstance.findOneAndRemove({key: keyString}, function(err)
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
};

const updateTag = (keyString, oldValue, newValue) =>
{
    return new Promise((resolve, reject) =>
    {
        const tagModelInstance = Container.get('tagModel');
        
        tagModelInstance.findOneAndUpdate({key: keyString, value: oldValue}, {key: keyString, value: newValue}, function(err)
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
};

export default
{
    setNewTag,
    deleteTag,
    updateTag
};