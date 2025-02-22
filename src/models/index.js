import userModel from './user';
import sectionModel from './section';
import templateModel from './template';
import jamlakModel from './jamlak';
import sppbjModel from './sppbj';
import contractModel from './contract';

export const MongoModels = [
    { name: 'userModel', model: userModel },
    { name: 'sectionModel', model: sectionModel },
    { name: 'templateModel', model: templateModel },
    { name: 'jamlakModel', model: jamlakModel },
    { name: 'sppbjModel', model: sppbjModel },
    { name: 'contractModel', model: contractModel },
];
