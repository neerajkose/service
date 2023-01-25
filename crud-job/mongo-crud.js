"use strict"
const constants = require('../constant/constant');
const { MongoClient, ServerApiVersion } = require('mongodb');


module.exports.createConnection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let responseObj = {}
            MongoClient.connect(process.env.DB_URL, { connectTimeoutMS: 360000, useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, (err, client) => {
                if (err) {
                    responseObj.status = constants.databaseStatus.DATABASE_ERROR
                    console.error('Connection Error With Service', err)
                    reject(responseObj)
                } else {
                    var db = client.db(process.env.DB_NAME);
                    resolve({
                        client: client,
                        db: db,
                        status: constants.databaseStatus.DATABASE_CONNECTION_ESTABLISHED
                    })
                }
            })
        } catch (error) {
            console.error('Something went wrong : Crud Repository : Create Connection: ', error)
            reject(constants.responseObj)
        }
    })
}

module.exports.closeConnection = (db) => {
    if (db) {
        db.close();
    }
}

module.exports.findAllData = (collection, data) => {
    return new Promise(async (resolve, reject) => {
        let responseObj = {}
        try {
            collection.find(data.query).project(data.project).sort({ name: 1 }).toArray((err, docs) => {
                if (err) {
                    console.error('Something went wrong : Crud Repository : Find All data: ', err)
                    responseObj.status = constants.databaseStatus.ENTITY_NOT_FOUND
                    reject(responseObj)
                } else {
                    resolve({
                        result: docs,
                        status: constants.databaseStatus.ENTITY_FETCHED
                    })
                }
            })
        } catch (error) {
            responseObj.status = constants.databaseStatus.DATABASE_ERROR
            console.error('Something went wrong : Crud Repository : Find All data: ', error)
            reject(constants.responseObj)
        }
    })
}

module.exports.insertData = (collection, data) => {
    return new Promise(async (resolve, reject) => {
        let responseObj = {}
        try {
            collection.insertOne(data.query, function (err, docs) {
                if (err) {
                    console.error('Something went wrong : Crud Repository : Insert data: ', err)
                    responseObj.status = constants.databaseStatus.ENTITY_NOT_FOUND
                    reject(responseObj)
                } else {
                    resolve({
                        result: docs.ops,
                        status: constants.databaseStatus.ENTITY_CREATED
                    })
                }
            });
        } catch (error) {
            responseObj.status = constants.databaseStatus.DATABASE_ERROR
            console.error('Something went wrong : Crud Repository : Insert data: ', error)
            reject(constants.responseObj)
        }
    })
}


module.exports.updateOne = (collection, data) => {
    return new Promise(async (resolve, reject) => {
        let responseObj = {}
        try {
            collection.updateOne(data.query, data.set, function (err, docs) {
                if (err) {
                    console.error('Something went wrong : Crud Repository : updateOne: ', err)
                    responseObj.status = constants.databaseStatus.ENTITY_NOT_FOUND
                    reject(responseObj)
                } else {
                    resolve({
                        result: docs,
                        status: constants.databaseStatus.ENTITY_MODIFIED
                    })
                }
            });
        } catch (error) {
            responseObj.status = constants.databaseStatus.DATABASE_ERROR
            console.error('Something went wrong : Crud Repository : updateOne: ', error)
            reject(constants.responseObj)
        }
    })
}