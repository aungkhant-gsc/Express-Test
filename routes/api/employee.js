const express = require('express');
const router = express.Router();


const {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require("../../controllers/employeesController")

router.route('/')
    .get(getAllEmployee)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route("/:id")
    .get(getEmployee)


module.exports = router