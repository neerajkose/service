'use strict'
const constants = require('../constant/constant');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')


module.exports.authenticateUser = async (req, res, next) => {
    let responseObj = {}
    try {
        let data = req.body,
            responseFromService = await userService.authenticateUser(data)
        switch (responseFromService.status) {
            case constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY:
                responseObj.status = constants.httpResponseStatusCode.SUCCESS;
                responseObj.message = constants.serviceStatus.USER_AUTHENTICATED_SUCCESSFULLY
                responseObj.body = responseFromService.body
                const token = jwt.sign(responseFromService.body[0], 'secretkey', { expiresIn: '90d' })
                responseObj.body[0].token = token
                break
            default:
                responseObj = constants.responseObj
                break
        }
        res.status(responseObj.status).send(responseObj)
    } catch (err) {
        console.error('Something went wrong : Controller : User Athentification: ', err)
        res.status(constants.responseObj.status).send(constants.responseObj)
    }
}

module.exports.createUser = async (req, res, next) => {
    let responseObj = {};
    try {
        const data = req.body;
        const responseFromService = await userService.createUser(data);
        switch (responseFromService.status) {
            case constants.serviceStatus.USER_SUCCESSFULLY_CREATED:
                responseObj.status = constants.httpResponseStatusCode.SUCCESS;
                responseObj.message = constants.serviceStatus.USER_SUCCESSFULLY_CREATED;
                responseObj.body = {}
                break
            case constants.serviceStatus.USER_EXIST:
                responseObj.status = 403;
                responseObj.message = constants.serviceStatus.USER_EXIST;
                responseObj.body = {};
                break;
            default:
                responseObj = constants.responseObj
                break
        }
        res.status(responseObj.status).send(responseObj)
    } catch (error) {
        console.error('Something went wrong: Controller: User creation', error)
        res.send(constants.responseObj.status).send(constants.responseObj)
    }
}   

    module.exports.getUserList = async (req, res, next) => {
        let responseObj = {};
        try {
            const responseFromService = await userService.getUserList();
            switch (responseFromService.status) {
                case constants.serviceStatus.USER_LIST_FETCHED:
                    responseObj.status = constants.httpResponseStatusCode.SUCCESS;
                    responseObj.message = constants.serviceStatus.USER_LIST_FETCHED;
                    responseObj.body = responseFromService.body
                    break;
                default:
                    responseObj = constants.responseObj
                    break
            }
            res.status(responseObj.status).send(responseObj)
        } catch (error) {
            console.error('Something went wrong: Controller: User list', error)
            res.send(constants.responseObj.status).send(constants.responseObj)
        }
    }

