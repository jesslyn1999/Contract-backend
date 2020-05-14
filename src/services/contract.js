import { Container } from 'typedi';
import { replaceAll, getDocxFromCloudmersive } from '../helper';
import _ from 'lodash';

const generateContract = (template_id, id_sppbj, id_jamlak, form_data) => {
    // Services
    const logger = Container.get('logger');
    // Models
    const templateModel = Container.get('templateModel');
    const sppbjModel = Container.get('sppbjModel');
    const jamlakModel = Container.get('jamlakModel');

    return new Promise(async (resolve, reject) => {
        let { content } = await templateModel
            .findById(template_id)
            .lean()
            .catch(reject);
        let { data_pemenang, data_form } = await sppbjModel
            .findById(id_sppbj)
            .lean()
            .catch(reject);
        let jamlak = await jamlakModel
            .findById(id_jamlak)
            .lean()
            .catch(reject);

        let getData = { ...data_pemenang, ...data_form, ...jamlak };
        let capitalizedGetData = _.mapKeys(getData, (value, key) => {
            return key.toUpperCase();
        });

        let populatedContent = replaceAll(
            content,
            capitalizedGetData,
            form_data,
        );

        getDocxFromCloudmersive(populatedContent)
            .then(async res => {
                if (res.status === 200) {
                    let saveObject = {
                        no_kontrak: form_data.NO_KONTRAK,
                        id_sppbj,
                        id_jamlak,
                        template_id,
                        form_data,
                        generate_document: {
                            data: res.data,
                        },
                    };
                    await saveContract(saveObject).catch(reject);
                    return resolve({
                        binary_data: res.data,
                        name: `Contract-${saveObject.no_contract}.docx`,
                    });
                }
                throw new Error(`Cloudmersive request doesn't end with 200 OK`);
            })
            .catch(err => {
                console.log(err);
                logger.error(
                    `[ContractService][GenerateContract]: Failed to generate contract using Cloudmersive API. ${err}`,
                );
            });
    });
};

const saveContract = saveObject => {
    return new Promise(async (resolve, reject) => {
        const contractModel = Container.get('contractModel');
        const newContractInstance = new contractModel({ ...saveObject });

        newContractInstance
            .save()
            .then(resolve)
            .catch(reject);
    });
};

const getAllContract = () => {
    return new Promise((resolve, reject) => {
        const contractModelInstance = Container.get('contractModel');
        const logger = Container.get('logger');

        contractModelInstance
            .find({})
            .select('-createdAt -updatedAt -__v -generated_document')
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[ContractService][GetAllContract]: Failed to get all contract. ${err}`,
                );
                reject(err);
            });
    });
};

const getContractByPage = (page, perPage) => {
    page = page || 1;
    perPage = parseInt(perPage) || 9;
    return new Promise(async (resolve, reject) => {
        const contractModelInstance = Container.get('contractModel');
        const logger = Container.get('logger');

        const sectionsCount = await contractModelInstance.countDocuments({});
        contractModelInstance
            .find({})
            .select('-createdAt -updatedAt -__v -generated_document')
            .skip(perPage * page - perPage)
            .limit(perPage)
            .then(result => {
                const pages = Math.ceil(sectionsCount / perPage);
                resolve([result, pages]);
            })
            .catch(err => {
                logger.error(
                    `[ContractService][GetContractByPage]: Failed to get contract by pages. ${err}`,
                );
                reject(err);
            });
    });
};

const download = contract_id => {
    return new Promise(async (resolve, reject) => {
        const contractModel = Container.get('contractModel');

        contractModel
            .findById(contract_id)
            .then(contract => {
                resolve({
                    name: `Contract-${contract.no_contract}`,
                    binary_data: contract.generated_document.data,
                });
            })
            .catch(reject);
    });
};

export default {
    generateContract,
    saveContract,
    getAllContract,
    getContractByPage,
    download,
};
