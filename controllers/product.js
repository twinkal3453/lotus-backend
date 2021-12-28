import Product from "../models/product.js";
import _ from "lodash";
import fs from "fs";

export const getProductById = (req, res, next, id) => {
  Product.findById(id)

    // if any error occors on collection for fixing
    .populate("category")
    .populate("collections")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

export const createProduct = (req, res) => {
  const fieldName = req.files;

  req.body.photos = [];

  for (let i = 0; i < fieldName.length; i++) {
    req.body.photos.push(req.files[i].filename);
  }

  // console.log(req.body.photos);

  const product = new Product(req.body);

  console.log(product);

  if (!req.files) {
    return res.status(400).json({
      error: "Pictures is not found!",
    });
  }

  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product uploaded Failed",
      });
    }
    res.json(product);
  });
};

export const getProduct = (req, res) => {
  // req.product.photos = undefined;
  return res.json(req.product);
};

export const getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 24;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    // .select("-photos")
    .populate("category")
    .populate("collections")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found!",
        });
      }
      res.json(products);
    });
};

export const updateProduct = (req, res) => {
  let product = req.product;
  const fieldName = req.files;

  req.body.photos = [];

  for (let i = 0; i < fieldName.length; i++) {
    req.body.photos.push(req.files[i].filename);
  }

  unlinkFile(req.product.photos);

  product
    .updateOne(req.body)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const delteProduct = (req, res) => {
  const product = req.product;

  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "product is deleted!",
      });
    }
    unlinkFile(req.product.photos);
    res.json({
      message: `This product ${product} is success`,
    });
  });
};

export const getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No Category found",
      });
    }
    res.json(category);
  });
};

export const updateStock = (req, res, next) => {
  let myOperations = req.body.order.product.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};

const unlinkFile = (fileName) => {
  if (fileName) {
    for (let i = 0; i < fileName.length; i++) {
      fs.unlink(`uploads/${fileName[i]}`, function (err) {
        if (err) {
          console.log(err);
        }
        // console.log("data not found");
      });
    }
  }
};
export default unlinkFile;
