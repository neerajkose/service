'use strict'
const constants = require('../constant/constant');
const orderService = require('../services/orderService');

module.exports.createOrder = async (req, res, next) => {
    let responseObj = {};
    try {
        const data = req.body;
        const responseFromService = await orderService.createOrder(data);
        switch (responseFromService.status) {
            case constants.serviceStatus.ORDER_SUCCESSFULLY_CREATED:
                responseObj.status = constants.httpResponseStatusCode.ENTITY_CREATED;
                responseObj.message = constants.serviceStatus.ORDER_SUCCESSFULLY_CREATED;
                responseObj.body = {};
                break;
            default:
                responseObj = constants.responseObj;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (error) {
        console.error('Something went wrong: Ordercontroller: Create Order', error);
        res.status(constants.status).send(constants.responseObj)
    }
}

module.exports.getOrderList = async (req, res, next) => {
    let responseObj = {};
    try {
        const responseFromService = await orderService.getOrderList();
        switch (responseFromService.status) {
            case constants.serviceStatus.ORDER_LIST_FETCHED:
                responseObj.status = constants.httpResponseStatusCode.SUCCESS;
                responseObj.message = constants.serviceStatus.ORDER_LIST_FETCHED;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (error) {
        console.error('Something went wrong: Ordercontroller: Order List', error);
        res.status(constants.status).send(constants.responseObj)
    }
}

module.exports.updateOrderStatus = async (req, res, next) => {
    let responseObj = {};
    try {
        let data = req.query;
        const responseFromService = await orderService.updateOrderStatus(data);
        switch (responseFromService.status) {
            case constants.serviceStatus.ORDER_UPDATED:
                responseObj.status = constants.httpResponseStatusCode.SUCCESS;
                responseObj.message = constants.serviceStatus.ORDER_UPDATED;
                responseObj.body = responseFromService.body;
                break;
            default:
                responseObj = constants.responseObj;
                break;
        }
        res.status(responseObj.status).send(responseObj);
    } catch (error) {
        console.error('Something went wrong: Order Controller: Order Controller: Update Order', error);
        res.status(constants.responseObj.status).send(responseObj);
    }
}