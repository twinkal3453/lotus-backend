import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

// secret key
const secret = process.env.SECRET;
const algo = [process.env.ALGORATHIM];

export const signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

export const signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }

    // Authenticate the token whether it is correct or not
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully!",
  });
};

// protected routes
export const isSignedIn = expressJwt({
  secret: secret,
  algorithms: algo,
  userProperty: "auth",
});

// custom middleware
export const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "YOU ARE NOT ADMIN!, ACCESS DENIED.",
    });
  }
  next();
};
