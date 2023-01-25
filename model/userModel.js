'use strict'
const Joi = require('joi');

const authenticateUserSchema = Joi.object().keys({
    userLoginId: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
}).required();

const createUserSchema = Joi.object().keys({
    externalId: Joi.string().trim().required(),
    userType: Joi.string().valid('ADMINHO','ADMINSR', 'ADMINRN'),
    name: Joi.string().trim().required(),
    userLoginId: Joi.string().trim().required(),
    mobileNumber: Joi.number().required(),
    pinCode: Joi.number().required(),
    add1: Joi.string().trim().required(),
    add2: Joi.string().trim().required(),
    district: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    email: Joi.string().optional()
})

module.exports = {
   'authenticateUserSchema': authenticateUserSchema,
   'createUserSchema': createUserSchema
}