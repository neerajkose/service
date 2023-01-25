"use strict"

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const schemavalidation = require('../helper/schemavalidation');
const orderModel = require('../model/orderModel');


router.post('/create', schemavalidation.validateBody(orderModel.createOrderSchema), orderController.createOrder);
router.get('/list', orderController.getOrderList);
router.patch('/update', schemavalidation.validateQueryParams(orderModel.updateOrderSchema), orderController.updateOrderStatus)

module.exports = router;