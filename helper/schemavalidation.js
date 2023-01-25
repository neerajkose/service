const Joi = require('joi')
const constants = require('../constant/constant')

let responseObj = {}
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body)
            if(result.error) {
                let errData = result.error.details.map((value)=> {
                    return {
                        error : value.message,
                        where : value.path
                    }
                })
                responseObj.status = 400
                responseObj.message = constants.controllerStatus.BAD_REQUEST
                responseObj.body = errData
                return res.status(responseObj.status).send(responseObj)
            } else {
                next();
            }
        }
    },
    validateParams: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.params)
            if(result.error) {
                let errData = result.error.details.map((value)=> {
                    return {
                        error : value.message,
                        where : value.path
                    }
                })
                responseObj.status = 400
                responseObj.message = constants.controllerStatus.BAD_REQUEST
                responseObj.body = errData
                return res.status(responseObj.status).send(responseObj)
            } else {
                next();
            }
        }
    },
    validateQueryParams: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.query)
            if(result.error) {
                let errData = result.error.details.map((value)=> {
                    return {
                        error : value.message,
                        where : value.path
                    }
                })
                responseObj.status = 400
                responseObj.message = constants.controllerStatus.BAD_REQUEST
                responseObj.body = errData
                return res.status(responseObj.status).send(responseObj)
            } else {
                next();
            }
        }
    }
}
