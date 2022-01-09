import Order from "../models/order.js";
import ProductCart from "../models/order.js";

export const getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

export const createOrder = (req, res) => {
  const user = req.profile;

  console.log("OrderData----->", req.body);

  const order = new Order(req.body);

  order.user = user._id;
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

export const getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Orders found in DB",
        });
      }
      res.json(order);
    });
};

export const getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

export const updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Can not update order status",
        });
      }
      res.json(order);
    }
  );
};
