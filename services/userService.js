'use strict'
const crudRepository = require('../crud-job/mongo-crud');
const constants = require('../constant/constant');
const constant = require('../constant/constant');


module.exports.authenticateUser = async (serviceData) => {
    let responseObj = {}
    try {
        let connectionResponse = await crudRepository.createConnection()
        if (connectionResponse.status === constants.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
            let data = {
                query: {
                    $and: [
                        {
                            $or: [
                                { "userLoginId": serviceData.userLoginId },
                                { "mobileNumber": serviceData.userLoginId }
                            ]
                        },
                        {
                            password: serviceData.password
                        }
                    ]
                }
            }
            let findDataResponse = await crudRepository.findAllData(connectionResponse.db.collection('user'), data)
            if ((findDataResponse.status === constants.databaseStatus.ENTITY_FETCHED) && findDataResponse.result.length) {
                responseObj.status = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY
                responseObj.body = findDataResponse.result
            } else {
                responseObj.status = constants.serviceStatus.INTERNAL_SERVER_ERROR
                responseObj.body = constants.responseObj
            }
        } else {
            responseObj.status = constants.serviceStatus.INTERNAL_SERVER_ERROR
            responseObj.body = constants.responseObj
        }
        crudRepository.closeConnection(connectionResponse.client)
        return responseObj
    } catch (error) {
        console.error('Something went wrong : Service : Create User: ', error);
        throw constant.responseObj;
    }
}

module.exports.createUser = async (serviceData) => {
    let responseObj = {};
    try {
        const connectionResponse = await crudRepository.createConnection();
        if (connectionResponse.status === constant.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
            let data = {
                query: {
                    mobileNumber: serviceData.mobileNumber
                }
            }
            let findDataResponse = await crudRepository.findAllData(connectionResponse.db.collection('user'), data);
            if (findDataResponse.status === constants.databaseStatus.ENTITY_FETCHED && findDataResponse.result.length) {
                responseObj.status = constants.serviceStatus.USER_EXIST;
                responseObj.body = {};
            } else {
                let data = {
                    query: serviceData
                }
                const insertDataResponse = await crudRepository.insertData(connectionResponse.db.collection('user'), data);
                if (insertDataResponse.status === constants.databaseStatus.ENTITY_CREATED) {
                    responseObj.status = constants.serviceStatus.USER_SUCCESSFULLY_CREATED;
                    responseObj.body = {};
                } else {
                    responseObj = constants.responseObj;
                }
            }
        } else {
            responseObj = constants.responseObj;
        }
        crudRepository.closeConnection(connectionResponse.client);
        return responseObj;
    } catch (error) {
        console.error('Something went wrong: User Service: Create User', error);
        throw constants.responseObj
    }
}

module.exports.getUserList = async () => {
    let responseObj = {};
    try {
        const connectionResponse = await crudRepository.createConnection();
        if (connectionResponse.status === constant.databaseStatus.DATABASE_CONNECTION_ESTABLISHED) {
                let data = {
                    query: {}
                }
                const findDataResponse = await crudRepository.findAllData(connectionResponse.db.collection('user'), data);
                if ((findDataResponse.status === constants.databaseStatus.ENTITY_FETCHED) && (findDataResponse.result)) {
                    responseObj.status = constants.serviceStatus.USER_LIST_FETCHED;
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
        console.error('Something went wrong: User Service: Create User', error);
        throw constants.responseObj
    }
}