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
    const { shippingInfo, cartItems, totalAmount, items } = req.body;
    console.log("hhhhhhhhhhhhhh", req.body);
    // Map cartItems to include productName and productImage
    // const items = cartItems.map((item) => ({
    //   productId: item.productId,
    //   productName: item.productName,
    //   productImage: item.productImage,
    //   quantity: item.quantity,
    //   price: item.price,
    // }));

    // Create an order document
    const order = new Order({
      fullName: items.shippingInfo.fullName,
      address: items.shippingInfo.address,
      city: items.shippingInfo.city,
      state: items.shippingInfo.state,
      postalCode: items.shippingInfo.postalCode,
      country: items.shippingInfo.country,
      items: items.cartItems[0],
      totalAmount: items.totalAmount,
    });

    await order.save();

    res.status(STATUS_CREATED).json({ message: MSG_ORDER_CREATED, order });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
exports.fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    console.log("Orders fetched successfully:", orders);
    res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};
