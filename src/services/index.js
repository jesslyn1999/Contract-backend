import userService from './user';
import adminService from './admin';
import sectionService from './section';
import templateService from './template';
import jamlakService from './jamlak';

export default [
    { name: 'userService', service: userService },
    { name: 'adminService', service: adminService },
    { name: 'sectionService', service: sectionService },
    { name: 'templateService', service: templateService },
    { name: 'jamlakService', service: jamlakService },
];
