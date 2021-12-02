import Brand from "../models/brand.js";
import _ from "lodash";
import fs from "fs";
import unlinkFile from "../config/unlinkFile.js";

export const getBrandById = (req, res, next, id) => {
  Brand.findById(id).exec((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Brand not found!",
      });
    }
    req.brand = brand;
    next();
  });
};

export const createBrand = (req, res) => {
  req.body.photo = req.file.filename;

  let obj = {
    name: req.body.name,
    photo: req.body.photo,
  };

  const brand = new Brand(obj);

  if (!req.file) {
    return res.status(400).json({
      error: "picture not found!",
    });
  }

  brand.save((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Brand uploaded failed!",
      });
    }
    res.json(brand);
  });
};

export const getBrand = (req, res) => {
  return res.json(req.brand);
};

export const getAllBrand = (req, res) => {
  Brand.find().exec((err, brands) => {
    if (err) {
      res.status(400).json({
        error: "brands not found!",
      });
    }
    res.json(brands);
  });
};

export const deleteBrand = (req, res) => {
  const brand = req.brand;

  brand.remove((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong, unable to delete!",
      });
    }
    unlinkFile(brand.photo);
    res.json(brand);
  });
};

export const updateBrand = (req, res) => {
  unlinkFile(req.brand.photo);
  let brand = req.brand;
  brand.name = req.body.name;
  brand.photo = req.file.filename;

  brand.save((err, brand) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to update brand!",
      });
    }
    res.json(brand);
  });
};
