import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    u_id: {
      type: Number,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
    quantity: {
      type: Number,
    },
    title: {
      type: String,
      trim: true,
    },
  },
);

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
