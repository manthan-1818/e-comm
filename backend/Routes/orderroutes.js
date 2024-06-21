const express = require('express');
const orderRouter = express.Router();
const { createOrder, fetchOrder } = require('../../backend/controller/ordercontroller');

orderRouter.get('/fetch-order' , fetchOrder);
orderRouter.post('/add-order', createOrder);

module.exports = orderRouter;
