const express = require('express');
const orderRouter = express.Router();
const { createOrder, fetchOrder } = require('../../backend/controller/ordercontroller');
const authentication = require('../../backend/middleware/auth');

orderRouter.get('/fetch-order', authentication, fetchOrder);
orderRouter.post('/add-order', createOrder);

module.exports = orderRouter;
