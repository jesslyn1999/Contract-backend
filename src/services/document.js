import { Container } from 'typedi';
import { replaceAll } from '../helper';
import puppeteer from 'puppeteer';
import path from 'path';

const addSppbjElement = (namaList, sppbjObject) => {
    namaList.push(sppbjObject);
};

const removeSppbjElement = (namaList, sppbjObject, sppbj_id) => {
    var removeID = namaList.findIndex(namaList.id == sppbj_id);
    namaList.splice(removeID, 1);
};

const setNewDocs = (_no, _tanggal, _pemenang, _kontrak) => {
    return new Promise((resolve, reject) => {
        const documentModelInstance = Container.get('documentModel');

        const newDocs = new documentModel({
            no_lampiran: _no,
            tanggal_terbit: _terbit,
            nama_pemenang: _pemenang,
            nilai_kontrak: _kontrak,
        });

        newDocs.save(err => {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const deleteDocs = _no => {
    return new Promise((resolve, reject) => {
        const documentModelInstance = Container.get('documentModel');

        tagModelInstance.findOneAndRemove({ no_lampiran: _no }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ success: true });
            }
        });
    });
};

const updateDocsTanggal = (_no, oldTanggal, newTanggal) => {
    return new Promise((resolve, reject) => {
        const documentModelInstance = Container.get('documentModel');

        tagModelInstance.findOneAndUpdate(
            { no_lampiran: _no, tanggal_terbit: oldTanggal },
            { no_lampiran: _no, tanggal_terbit: newTanggal },
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

const updateDocsPemenang = (_no, oldPemenang, newPemenang) => {
    return new Promise((resolve, reject) => {
        const documentModelInstance = Container.get('documentModel');

        tagModelInstance.findOneAndUpdate(
            { no_lampiran: _no, nama_pemenang: oldPemenang },
            { no_lampiran: _no, nama_pemenang: newPemenang },
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

const updateDocsKontrak = (_no, oldKontrak, newKontrak) => {
    return new Promise((resolve, reject) => {
        const documentModelInstance = Container.get('documentModel');

        tagModelInstance.findOneAndUpdate(
            { no_lampiran: _no, nilai_kontrak: oldKontrak },
            { no_lampiran: _no, nilai_kontrak: newKontrak },
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

const generateSPPBJ = (id_template, data_pemenang, form_data) => {
    const templateService = Container.get('templateService');
    return new Promise(async (resolve, reject) => {
        let template = await templateService
            .getTemplateById(id_template)
            .catch(reject);

        let templateContent = template.content;

        let populatedContent = replaceAll(
            templateContent,
            data_pemenang,
            form_data,
        );

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        let csspath = path.join(
            __dirname,
            '../resource/ckeditor-content-style.css',
        );
        await page.addStyleTag({
            path: csspath,
        });
        await page.setContent(populatedContent);
        const pdf = await page.pdf({ format: 'A4' });
        await browser.close();

        await saveSPPBJ(id_template, data_pemenang, form_data, pdf).catch(
            reject,
        );

        resolve(pdf);
    });
};

const saveSPPBJ = (template_id, data_pemenang, data_form, pdf_data) => {
    return new Promise(async (resolve, reject) => {
        const sppbjModel = Container.get('sppbjModel');
        const newSppbjInstance = new sppbjModel({
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
            .select('-createdAt -updatedAt -__v -_id')
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                logger.error(
                    `[DocumentService][GetAllSPPBJ]: Failed to get all sppbj. ${err}`,
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
            .select('-createdAt -updatedAt -__v -_id')
            .skip(perPage * page - perPage)
            .limit(perPage)
            .then(result => {
                const pages = Math.ceil(sectionsCount / perPage);
                resolve([result, pages]);
            })
            .catch(err => {
                logger.error(
                    `[DocumentService][GetSPPBJByPage]: Failed to get sections by pages. ${err}`,
                );
                reject(err);
            });
    });
};

export default {
    addSppbjElement,
    removeSppbjElement,
    setNewDocs,
    deleteDocs,
    updateDocsTanggal,
    updateDocsPemenang,
    updateDocsKontrak,
    generateSPPBJ,
    saveSPPBJ,
    getAllSppbj,
    getSppbjByPage,
};
