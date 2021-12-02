import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import {
  getContactById,
  getAllContacts,
  createContact,
  getContact,
  deleteContact,
} from "../controllers/contact.js";
import { isAdmin, isSignedIn, isAuthenticated } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

// params
router.param("userId", getUserById);
router.param("contactId", getContactById);

// all actual routes
router.post(
  "/contact/create",
  [check("email", "email valid is required").isEmail()],
  createContact
);
router.get(
  "/contacts/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllContacts
);
router.get(
  "/contact/:contactId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getContact
);
router.delete(
  "/contact/delete/:contactId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteContact
);

export default router;
