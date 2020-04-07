import { Container } from 'typedi';

const addSppbjElement = (namaList, sppbjObject) =>
{
    namaList.push(sppbjObject);
}

const removeSppbjElement = (namaList, sppbjObject, sppbj_id) =>
{
    var removeID = namaList.findIndex(namaList.id == sppbj_id);
    namaList.splice(removeID, 1);
}

export default
{
    addSppbjElement,
    removeSppbjElement
};