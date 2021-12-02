import Category from "../models/category.js";
import _ from "lodash";
import fs from "fs";
import unlinkFile from "../config/unlinkFile.js";

export const getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found!",
      });
    }
    req.category = category;
    next();
  });
};

export const createCategory = (req, res) => {
  req.body.photo = req.file.filename;

  let obj = {
    name: req.body.name,
    photo: req.body.photo,
  };

  const category = new Category(obj);

  if (!req.file) {
    return res.status(404).json({ error: true, message: "Picture not found" });
  }

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Category Uploaded Failed!",
      });
    }
    res.json(category);
  });
};

export const getCategory = (req, res) => {
  return res.json(req.category);
};

export const getAllCategories = (req, res) => {
  Category.find().exec((err, cateogries) => {
    if (err) {
      return res.status(400).json({
        error: "category not found",
      });
    }
    res.json(cateogries);
  });
};

export const deleteCategory = (req, res) => {
  const category = req.category;
  // console.log(category);

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong, unable to delete!",
      });
    }
    unlinkFile(category.photo);
    res.json(category);
  });
};

export const updateCategory = (req, res) => {
  unlinkFile(req.category.photo);
  let category = req.category;
  category.name = req.body.name;
  category.photo = req.file.filename;

  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to Update cateogry",
      });
    }

    res.json(category);
  });
};
