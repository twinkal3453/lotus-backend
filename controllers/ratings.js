import Rate from "../models/ratings.js";

export const getRatingById = (req, res, next, id) => {
  Rate.findById(id)
    .populate("product")
    .exec((err, ratings) => {
      if (err) {
        return res.status(400).json({
          error: "Rate not found in DB",
        });
      }
      req.ratings = ratings;
      next();
    });
};

export const createRatings = (req, res) => {
  const ratings = new Rate(req.body);

  ratings.save((err, ratings) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save rating in DB",
      });
    }
    res.json(ratings);
  });
};

export const getRating = (req, res) => {
  return res.json(req.ratings);
};

export const getAllRatings = (req, res) => {
  let product = req.query.product;
  Rate.find(product && { product })
    .populate("product")
    .exec((err, ratings) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to get ratings",
        });
      }
      res.json(ratings);
    });
};

export const updateRatings = (req, res) => {
  const ratings = req.ratings;
  ratings.name = req.body.name;
  ratings.star = req.body.star;
  ratings.description = req.body.description;
  ratings.product = req.body.product;

  ratings.save((err, ratings) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to update",
      });
    }
    res.json(ratings);
  });
};

export const removeRatings = (req, res) => {
  const ratings = req.ratings;

  ratings.remove((err, ratings) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to delete the ratings",
      });
    }
    res.json({
      message: `${ratings} is deleted successfully.`,
    });
  });
};
