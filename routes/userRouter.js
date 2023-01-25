'use strict'
const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel')
const userController = require('../controller/userController');
const schemaValidation = require('../helper/schemavalidation');

router.post('/authenticate',
    schemaValidation.validateBody(userModel.authenticateUserSchema),
    userController.authenticateUser)

router.post('/create',
       schemaValidation.validateBody(userModel.createUserSchema),
       userController.createUser)    

router.get('/list',
       userController.getUserList)         

module.exports = router;