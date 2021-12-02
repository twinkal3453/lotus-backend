import Carousel from "../models/carousel.js";
import _ from "lodash";

import unlinkFile from "../config/unlinkFile.js";

export const getCarouselById = (req, res, next, id) => {
  Carousel.findById(id).exec((err, carousel) => {
    if (err) {
      return res.status(400).json({
        error: "Carousel not found!",
      });
    }
    req.carousel = carousel;
    next();
  });
};

export const createCarousel = (req, res) => {
  req.body.photo = req.file.filename;

  let obj = {
    name: req.body.name,
    photo: req.body.photo,
  };

  const carousel = new Carousel(obj);

  if (!req.file) {
    return res.status(400).json({
      error: "picture not found!",
    });
  }

  carousel.save((err, carousel) => {
    if (err) {
      return res.status(400).json({
        error: "Carousel uploaded failed!",
      });
    }
    res.json(carousel);
  });
};

export const getACarousel = (req, res) => {
  const carousel = req.carousel;
  return res.json(carousel);
};

export const getAllCarousel = (req, res) => {
  Carousel.find().exec((err, carousels) => {
    if (err) {
      return res.status(400).json({
        error: "Carousels not found!",
      });
    }
    res.json(carousels);
  });
};

export const deleteCarousel = (req, res) => {
  const carousel = req.carousel;

  carousel.remove((err, carousel) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong, unable to delete!",
      });
    }
    unlinkFile(carousel.photo);
    res.json({
      message: `${carousel} is deleted!`,
    });
  });
};

export const updateCarousel = (req, res) => {
  unlinkFile(req.carousel.photo);
  let carousel = req.carousel;
  carousel.name = req.body.name;
  carousel.photo = req.file.filename;

  carousel.save((err, carousel) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to update Carousel!",
      });
    }
    res.json(carousel);
  });
};
