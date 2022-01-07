import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const ratingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    star: {
      type: String,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5000,
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rate", ratingSchema);
