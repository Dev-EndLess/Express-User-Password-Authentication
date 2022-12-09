const express = require('express')
const router = express.Router()
const employeesController = require('../../controllers/employeesController')
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
  // go to the middleware first and than to employeesColtroller
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee)

// get request param in url 
router.route('/:id')
  .get(employeesController.getEmployee)

module.exports = router