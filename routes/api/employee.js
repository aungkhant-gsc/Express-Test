const express = require('express');
const router = express.Router();

const ROLES_LIST = require("../../config/role_list");
const roleVerify = require('../../middleware/rolesVerify.js')

const {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require("../../controllers/employeesController");

router.route('/')
    .get(roleVerify(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User), getAllEmployee)
    .post(roleVerify(ROLES_LIST.Admin, ROLES_LIST.Editor) ,createNewEmployee)
    .put(roleVerify(ROLES_LIST.Admin, ROLES_LIST.Editor),updateEmployee)
    .delete(roleVerify(ROLES_LIST.Admin), deleteEmployee)

router.route("/:id")
    .get(getEmployee)


module.exports = router