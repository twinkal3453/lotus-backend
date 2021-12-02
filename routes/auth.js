import express from "express";
var router = express.Router();
import { check, validationResult } from "express-validator";
import {
  signup,
  signout,
  signin,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} from "../controllers/auth.js";

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 charecter!").isLength({ min: 3 }),
    check("email", "email valid is required").isEmail(),
    check("password", "password should be at least 3 charecter!").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email valid is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 3,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.json(req.auth);
});

export default router;
