"use strict"
const jwt = require('jsonwebtoken')
const constants = require('../constant/constant')

let responseObj = {}
module.exports = {
    validateToken: () => {
        return (req, res, next) => {
            const bearerHeader = req.headers['authorization']
            if (bearerHeader) {
                jwt.verify(bearerHeader.split(' ')[1], 'secretkey', (err, authData) => {
                    if (err) {
                        responseObj.status = 400
                        responseObj.message = constants.controllerStatus.INVALID_TOKEN
                        responseObj.body = err
                        return res.status(responseObj.status).send(responseObj)
                    } else {
                        next();
                    }
                })
            } else {
                responseObj.status = 400
                responseObj.message = constants.controllerStatus.TOKEN_MISSING
                responseObj.body = {}
                return res.status(responseObj.status).send(responseObj)
            }
        }
    }
}
