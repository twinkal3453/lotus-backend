import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    discount: {
      type: Number,
      maxlength: 32,
      trim: true,
    },
    discType: {
      type: String,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    collections: {
      type: ObjectId,
      ref: "Collection",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photos: {
      type: Array,
      default: [],
    },
    colors: {
      type: Array,
      default: [],
      required: true,
    },
    sizes: {
      type: Array,
      default: [],
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    fabric: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    sleeve: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    pattern: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    suitableFor: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
