import sectionService from './section';
import templateService from './template';
import jamlakService from './jamlak';
import documentService from './document';
import formService from './form';
import sppbjService from './sppbj';
import contractService from './contract';

export default [
    { name: 'sectionService', service: sectionService },
    { name: 'templateService', service: templateService },
    { name: 'jamlakService', service: jamlakService },
    { name: 'documentService', service: documentService },
    { name: 'formService', service: formService },
    { name: 'sppbjService', service: sppbjService },
    { name: 'contractService', service: contractService },
];
