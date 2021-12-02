import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
    maxlength: 32,
  },
});

export default mongoose.model("Brand", brandSchema);
