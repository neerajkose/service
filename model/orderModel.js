'use strict'
const Joi = require("joi");

const createOrderSchema = Joi.object({
    customerName: Joi.string().trim().required(),
    pinCode: Joi.number().required(),
    add1: Joi.string().trim().required(),
    add2: Joi.string().trim().required(),
    mobNumber: Joi.number().required(),
    altMobNumber: Joi.number().optional(),
    date: Joi.string().trim().required(),
    time: Joi.number().required(),
    rate: Joi.number().required(),
    orderTotal: Joi.number().required(),
    district: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    status: Joi.string().valid('pending').trim().required(),
    orderId: Joi.string().trim().required()
})

module.exports.updateOrderSchema = Joi.object({
    _id: Joi.string().trim().required(),
    status: Joi.string().valid('approved', 'billed')
})

module.exports = {
    createOrderSchema: createOrderSchema,
    updateOrderSchema: this.updateOrderSchema
}