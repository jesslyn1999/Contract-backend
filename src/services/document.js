// import { Container } from 'typedi';

const addSppbjElement = (namaList, sppbjObject) => {
    namaList.push(sppbjObject);
};

const removeSppbjElement = (namaList, sppbjObject, sppbj_id) => {
    var removeID = namaList.findIndex(namaList.id == sppbj_id);
    namaList.splice(removeID, 1);
};

// const setNewDocs = (_no, _tanggal, _pemenang, _kontrak) => {
//     return new Promise((resolve, reject) => {
//         const documentModelInstance = Container.get('documentModel');

//         const newDocs = new documentModel({
//             no_lampiran: _no,
//             tanggal_terbit: _terbit,
//             nama_pemenang: _pemenang,
//             nilai_kontrak: _kontrak,
//         });

//         newDocs.save(err => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve({ success: true });
//             }
//         });
//     });
// };

// const deleteDocs = _no => {
//     return new Promise((resolve, reject) => {
//         const documentModelInstance = Container.get('documentModel');

//         tagModelInstance.findOneAndRemove({ no_lampiran: _no }, function(err) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve({ success: true });
//             }
//         });
//     });
// };

// const updateDocsTanggal = (_no, oldTanggal, newTanggal) => {
//     return new Promise((resolve, reject) => {
//         const documentModelInstance = Container.get('documentModel');

//         tagModelInstance.findOneAndUpdate(
//             { no_lampiran: _no, tanggal_terbit: oldTanggal },
//             { no_lampiran: _no, tanggal_terbit: newTanggal },
//             function(err) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve({ success: true });
//                 }
//             },
//         );
//     });
// };

// const updateDocsPemenang = (_no, oldPemenang, newPemenang) => {
//     return new Promise((resolve, reject) => {
//         const documentModelInstance = Container.get('documentModel');

//         tagModelInstance.findOneAndUpdate(
//             { no_lampiran: _no, nama_pemenang: oldPemenang },
//             { no_lampiran: _no, nama_pemenang: newPemenang },
//             function(err) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve({ success: true });
//                 }
//             },
//         );
//     });
// };

// const updateDocsKontrak = (_no, oldKontrak, newKontrak) => {
//     return new Promise((resolve, reject) => {
//         const documentModelInstance = Container.get('documentModel');

//         tagModelInstance.findOneAndUpdate(
//             { no_lampiran: _no, nilai_kontrak: oldKontrak },
//             { no_lampiran: _no, nilai_kontrak: newKontrak },
//             function(err) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve({ success: true });
//                 }
//             },
//         );
//     });
// };

export default {
    addSppbjElement,
    removeSppbjElement,
    // setNewDocs,
    // deleteDocs,
    // updateDocsTanggal,
    // updateDocsPemenang,
    // updateDocsKontrak,
};
