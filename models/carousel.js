import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Carousel", carouselSchema);
