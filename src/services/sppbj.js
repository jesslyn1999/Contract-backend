import { Container } from 'typedi';
import { replaceAll, getDocxFromCloudmersive } from '../helper';

const generateSPPBJ = (id_template, data_pemenang, form_data) => {
    return new Promise(async (resolve, reject) => {
        console.log(id_template, data_pemenang, form_data);
        const templateService = Container.get('templateService');
        const logger = Container.get('logger');

        let template = await templateService
            .getTemplateById(id_template)
            .catch(reject);

        let templateContent = template.content;

        let populatedContent = replaceAll(
            templateContent,
            data_pemenang,
            form_data,
        );
        // code for generating pdf
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // let csspath = path.join(
        //     __dirname,
        //     '../resource/ckeditor-content-style.css',
        // );
        // await page.addStyleTag({
        //     path: csspath,
        // });
        // await page.setContent(populatedContent);
        // const pdf = await page.pdf({ format: 'A4' });
        // await browser.close();

        getDocxFromCloudmersive(populatedContent)
            .then(async res => {
                if (res.status === 200) {
                    await saveSPPBJ(
                        id_template,
                        data_pemenang,
                        form_data,
                        res.data,
                    ).catch(reject);
                    return resolve({
                        binary_data: res.data,
                        name: 'SPPBJ.docx',
                    });
                }
                throw new Error(`Cloudmersive request doesn't end with 200 OK`);
            })
            .catch(err => {
                console.log(err);
                logger.error(
                    `[SPPBJService][GenerateSPPBJ]: Failed to generate SPPBJ using Cloudmersive API. ${err}`,
                );
            });
    });
};

const saveSPPBJ = (template_id, data_pemenang, data_form, pdf_data) => {
    return new Promise(async (resolve, reject) => {
        const sppbjModel = Container.get('sppbjModel');
        const newSppbjInstance = new sppbjModel({
            no_sppbj: data_form.NO_SPPBJ,
            template_id,
            data_pemenang,
            data_form,
            generated_document: {
                data: pdf_data,
            },
        });

        newSppbjInstance
            .save()
            .then(resolve)
            .catch(reject);
    });
};

const getAllSppbj = () => {
    return new Promise((resolve, reject) => {
        const sppbjModelInstance = Container.get('sppbjModel');
        const logger = Container.get('logger');

        sppbjModelInstance
            .find({})
            .select('-createdAt -updatedAt -__v -generated_document')
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[SPPBJService][GetAllSPPBJ]: Failed to get all sppbj. ${err}`,
                );
                reject(err);
            });
    });
};

const getSppbjByPage = (page, perPage) => {
    page = page || 1;
    perPage = parseInt(perPage) || 9;
    return new Promise(async (resolve, reject) => {
        const sppbjModelInstance = Container.get('sppbjModel');
        const logger = Container.get('logger');

        const sectionsCount = await sppbjModelInstance.countDocuments({});
        sppbjModelInstance
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
                    `[SPPBJService][GetSPPBJByPage]: Failed to get sections by pages. ${err}`,
                );
                reject(err);
            });
    });
};

const download = sppbj_id => {
    return new Promise(async (resolve, reject) => {
        const sppbjModel = Container.get('sppbjModel');

        sppbjModel
            .findById(sppbj_id)
            .then(sppbj => {
                resolve({
                    name: `Contract-${sppbj.no_sppbj}`,
                    binary_data: sppbj.generated_document.data,
                });
            })
            .catch(reject);
    });
};

export default {
    generateSPPBJ,
    saveSPPBJ,
    getAllSppbj,
    getSppbjByPage,
    download,
};
