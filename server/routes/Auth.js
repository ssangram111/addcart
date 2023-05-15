import express from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/AuthController.js";
import { Cartcontroller, cartDeleteController, getcartcontroller, updateCartController } from "../controllers/Cartcontroller.js";
import { isAdmin, Middleware } from "../middlewares/Middleware.js";

//router object
const router = express.Router();

router.post("/register", RegisterController);

//Login
router.post("/login", LoginController);

//add cart
router.post("/add-to-cart",Cartcontroller)

//delete cart
router.delete('/cart-delete/:id',cartDeleteController)
//get cartdata
router.get("/getcart",getcartcontroller)
//update cart
router.put('/update-cart/:id',updateCartController)

//protected route auth

router.get("/user-auth", Middleware, (req, res) => {
  res.status(200).send({ ok: true });
});



export default router;
