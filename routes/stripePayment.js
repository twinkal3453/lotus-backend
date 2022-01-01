import express from "express";
const router = express.Router();
import { makepayment } from "../controllers/stripePayment.js";

router.post("/stripepayment", makepayment);

export default router;
