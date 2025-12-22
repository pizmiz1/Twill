import express from "express";
import { body, query, ValidationChain } from "express-validator";
import { authenticate } from "../middleware/authentication.js";
import { validate } from "../middleware/validation.js";
import { get, post } from "../controllers/moduleController.js";

// Validators
const postValidator: ValidationChain[] = [
  body("name").isString().withMessage("Name must be a string").trim().escape(),
  body("icon").isString().withMessage("Icon must be a string").trim().escape(),
  body("days").isObject().withMessage("Days must be an object"),
  body("days.*").isBoolean().withMessage("Days data must be booleans"),
];

const getValidator: ValidationChain[] = [query("id").optional().isString().withMessage("Search term must be a string").trim()];

// Routes
const moduleRoutes = express.Router();
const baseUrl = "/module";

moduleRoutes.route(baseUrl).post(authenticate, postValidator, validate, post);
moduleRoutes.route(baseUrl).get(authenticate, getValidator, validate, get);

export default moduleRoutes;
