import userService from './user';
import adminService from './admin';
import sectionService from './section'

export default [
    { name: 'userService', service: userService },
    { name: 'adminService', service: adminService },
    { name: 'sectionService', service: sectionService}
];
