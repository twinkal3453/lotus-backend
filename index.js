import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

// my routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import collectionRoutes from "./routes/collection.js";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import contactRoutes from "./routes/contact.js";
import brandRoutes from "./routes/brand.js";
import carouselRoutes from "./routes/carousel.js";
import ratingRoutes from "./routes/ratings.js";
import orderRoutes from "./routes/order.js";
import stripeRoutes from "./routes/stripePayment.js";

// App Config
const app = express();
const connection_url = process.env.DB_URL;

// Middleware
app.use(express.json());
app.use(cors());
// parse application/json
app.use(bodyparser.json());
app.use(cookieParser());

// Db config
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });

// My routes
app.use("/uploads", express.static("uploads"));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", collectionRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", contactRoutes);
app.use("/api", brandRoutes);
app.use("/api", carouselRoutes);
app.use("/api", ratingRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
