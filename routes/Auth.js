import express from "express";
import {
  RegisterController,
  LoginController,
  testController,
  forgotPasswordController,
} from "../controllers/AuthController.js";
import { isAdmin, Middleware } from "../middlewares/Middleware.js";

//router object
const router = express.Router();

router.post("/register", RegisterController);

//Login
router.post("/login", LoginController);

//test controller
router.get("/test", Middleware, isAdmin, testController);

//protected route auth

router.get("/user-auth", Middleware, (req, res) => {
  res.status(200).send({ ok: true });
});

//forget password
router.post("/forget-password", forgotPasswordController);

//protected route admin auth
router.get("/admin-auth", Middleware, isAdmin, (req,res) => {
  res.status(200).send({ok:true})
});

export default router;
