import express from "express";
import userAuthController from "../Controllers/userController";
import isUserAuth from "../utils/isUserAuth";

const Router = express.Router();

// Routes Common To all

Router.post("/signup", userAuthController.signup);
Router.post("/signin", userAuthController.signin);
Router.get("/logout", userAuthController.logout);
Router.put("/forgotpassword", isUserAuth, userAuthController.forgotpassword);
Router.put("/otpvarify", userAuthController.otpvarify);

module.exports = Router;
