const Order = require("../models/order");
const User = require("../models/user");
const {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_ORDER_CREATED,
  MSG_ORDERS_FETCHED,
  MSG_INTERNAL_SERVER_ERROR,
} = require("../constant/constantError");

exports.createOrder = async (req, res) => {
  try {
    console.log("hhhhhhhhhhhhhh", req.body);
    
    // const { shippingInfo, cartItems, totalAmount } = req.body;

    // console.log("hhfffffffffffffffh", shippingInfo, cartItems, totalAmount );
    const { items } = req.body;
    console.log("-------------------", items.shippingInfo.fullName);
    console.log(items.cartItems[0]);
    // Create an order document
    const order = new Order({
      fullName: items.shippingInfo.fullName,
      address:  items.shippingInfo.address,
      city:  items.shippingInfo.city,
      state:  items.shippingInfo.state,
      postalCode:  items.shippingInfo.postalCode,
      country:  items.shippingInfo.country,
      items: items.cartItems[0],
      totalAmount: items.totalAmount,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};
exports.fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
