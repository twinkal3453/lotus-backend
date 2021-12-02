import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
