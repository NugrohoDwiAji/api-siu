import express from "express";
const signupRouter = express.Router();

import { signUp } from "../controllers/registerController.js";
signupRouter
  .route("/")
  .post(signUp);

export default signupRouter;
