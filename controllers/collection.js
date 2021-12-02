import Collection from "../models/collection.js";

export const getCollectionById = (req, res, next, id) => {
  Collection.findById(id).exec((err, colle) => {
    if (err) {
      return res.status(400).json({
        error: "Collection not found in DB",
      });
    }
    req.collection = colle;
    next();
  });
};

export const createCollection = (req, res) => {
  const collection = new Collection(req.body);

  collection.save((err, collection) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save collection in DB",
      });
    }
    res.json({ collection });
  });
};

export const getCollection = (req, res) => {
  return res.json(req.collection);
};

export const getAllCollections = (req, res) => {
  Collection.find().exec((err, collections) => {
    if (err) {
      return res.status(400).json({
        error: "NO Collections found",
      });
    }
    res.json(collections);
  });
};

export const updateCollection = (req, res) => {
  const collection = req.collection;
  collection.name = req.body.name;

  collection.save((err, updatedCollection) => {
    if (err) {
      return res.status(400).json({
        error: "failed to update collection",
      });
    }
    res.json(updatedCollection);
  });
};

export const removeCollection = (req, res) => {
  const collection = req.collection;

  collection.remove((err, collection) => {
    if (err) {
      return res.status(400).json({
        error: "failed to delete this collection",
      });
    }
    res.json({
      message: `This collection ${collection} is successfully deleted`,
    });
  });
};
