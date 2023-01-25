'use strict'

const constants = require('../constant/constant');
const crudRepository = require('../crud-job/mongo-crud');
const ObjectId = require('mongodb').ObjectId

module.exports.createOrder = async (serviceData) => {
    let responseObj = {};
    try {
        const connectionResponse = await crudRepository.createConnection();
        if (connectionResponse.status = constants.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
            const data = {
                query: serviceData
            }
            const insertDataResponse = await crudRepository.insertData(connectionResponse.db.collection('order'), data);
            if ((insertDataResponse.status === constants.databaseStatus.ENTITY_CREATED)) {
                responseObj.status = constants.serviceStatus.ORDER_SUCCESSFULLY_CREATED;
                responseObj.body = insertDataResponse.result
            } else {
                responseObj = constants.responseObj;
            }
        } else {
            responseObj = constants.responseObj;
        }
        crudRepository.closeConnection(connectionResponse.client);
        return responseObj;
    } catch (error) {
        console.error('Something went wrong: OrderService: Create Order', error);
        throw responseObj;
    }
}

module.exports.getOrderList = async () => {
    let responseObj = {};
    try {
        const connectionResponse = await crudRepository.createConnection();
        if (connectionResponse.status === constants.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
            let data = {
                query: {}
            }
            const findDataResponse = await crudRepository.findAllData(connectionResponse.db.collection('order'), data);
            if (findDataResponse.status === constants.databaseStatus.ENTITY_FETCHED && findDataResponse.result) {
                responseObj.status = constants.serviceStatus.ORDER_LIST_FETCHED;
                responseObj.body = findDataResponse.result
            } else {
                responseObj = constants.responseObj;
            }
        } else {
            responseObj = constants.responseObj;
        }
        crudRepository.closeConnection(connectionResponse.client);
        return responseObj;
    } catch (error) {
        console.error('Something went wrong: Order Service: Get Order List', error);
        throw constants.responseObj;
    }
}


module.exports.updateOrderStatus = async (serviceData) => {
    let responseObj = {};
    try {
        const connectionResponse = await crudRepository.createConnection();
        if (connectionResponse.status === constants.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
            let data = {
                query: {
                    _id: ObjectId(serviceData._id)
                },
                set: {
                    '$set': {
                        status: serviceData.status
                    }
                }
            }
             let updateDataResponse = await crudRepository.updateOne(connectionResponse.db.collection('order'), data);
            if (updateDataResponse.status === constants.databaseStatus.ENTITY_MODIFIED) {
                responseObj.status = constants.serviceStatus.ORDER_UPDATED;
                responseObj.body = updateDataResponse.result;
            } else {
                responseObj = constants.responseObj;
            }
        } else {
            responseObj = constants.responseObj;
        }
        crudRepository.closeConnection(connectionResponse.client);
        return responseObj;
    } catch (error) {
        console.error('Something went wrong: Order Service: Update Order', error);
        return responseObj;
    }
}