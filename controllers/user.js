import User from "../models/user.js";
import Order from "../models/order.js";

export const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.stauts(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

export const getUser = (req, res) => {
  // TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

export const getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "NO users found",
      });
    }
    res.json(users);
  });
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.json(400).json({
          error: "You are not authorize to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

export const userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.json(order);
    });
};

export const pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      photo: product.photos[0],
      description: product.description,
      category: product.categoryData,
      collection: product.collectionData,
      price: product.price,
      quantity: product.count,
      discount: product.discount,
      amount: req.body.amount,
      transaction_id: req.body.transaction_id,
    });
  });

  // sotre this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
