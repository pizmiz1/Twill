import express from "express";
import { authenticate } from "../middleware/authentication.js";
import { get, patch } from "../controllers/userSettingsController.js";
import { body, ValidationChain } from "express-validator";
import { validate } from "../middleware/validation.js";

// Validators
const patchValidators: ValidationChain[] = [body("enableCompleteAnimation").isBoolean().withMessage("enableCompleteAnimation must be a boolean.")];

// Routes
const userSettingsRoutes = express.Router();
const baseUrl = "/userSettings";

userSettingsRoutes.route(baseUrl).get(authenticate, get);
userSettingsRoutes.route(baseUrl).patch(authenticate, patchValidators, validate, patch);

export default userSettingsRoutes;
