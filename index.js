"use strict"
const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


// configure dotenv
dotEnv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

app.use('/', express.static(path.join(__dirname, 'public/jcb-dashboard')))
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// handle corss platform request
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))


const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter')
process.env.UV_THREADPOOL_SIZE = 128

// manage routes
app.use("/api/user", userRouter);
app.use('/api/order', orderRouter)

app.use('*', (req, res, next) => {
    res.send({})
})

// error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || '';

    res.status(status).json({
        status,
        message: message,
        body: {}
    });
});

// manage server run
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port : ${process.env.PORT}`)
});




