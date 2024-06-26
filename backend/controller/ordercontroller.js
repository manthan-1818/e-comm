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
    const {items, user_id } = req.body;

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
      userID: user_id,
    });
    console.log("tttttttttttt",items.shippingInfo.fullName);
    console.log("Order object to be saved:", order);
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
    const { userId } = req.query;
    console.log("User ID:", userId);

    const fetchedUser = await User.findById(userId);
    if (!fetchedUser) {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "User not found" });
    }

    console.log("User Role:", fetchedUser);

    let orders = [];
    if (fetchedUser?.role === "Admin") {
      orders = await Order.find();
    } else if (fetchedUser?.role === "User") {
      orders = await Order.find({ userID: userId });
    } else {
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "Invalid user role" });
    }

    console.log("Orders fetched successfully:", orders);
    res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: MSG_INTERNAL_SERVER_ERROR });
  }
};

// exports.fetchOrder = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     console.log("Orders fetched successfully:", orders);
//     res.status(STATUS_SUCCESS).json({ message: MSG_ORDERS_FETCHED, orders });
//   } catch (error) {
//     res
//       .status(STATUS_INTERNAL_SERVER_ERROR)
//       .json({ message: MSG_INTERNAL_SERVER_ERROR });
//   }
// };
