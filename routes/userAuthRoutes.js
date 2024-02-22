import { Login, Logout, Register } from "../controllers/userAuthController.js";
// Input Validation for data that user send
import {
  validateLoginInput,
  validateRegisterInput,
  validateUpdateUserInput,
} from "../validations/userInputValidation.js";

import express from "express";
import apiLimiter from "../utils/rateLimiter.js";
// import { authenticateUser } from "../middleware/auth.js";

const userAuthRouter = express.Router();

userAuthRouter.post("/register", apiLimiter, validateRegisterInput, Register);
userAuthRouter.post("/login", apiLimiter, validateLoginInput, Login);
userAuthRouter.get("/logout", Logout);
export default userAuthRouter;
