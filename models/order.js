import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  photos: Array,
  size: String,
  color: String,
  name: String,
  count: Number,
  price: Number,
  discount: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: { type: String },
    amount: { type: Number },
    address: Object,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
export { ProductCart };
