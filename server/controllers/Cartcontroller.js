import Cart from "../model/cartModal.js";

export const Cartcontroller = async (req, res) => {
  try {
    const { category, description, u_id, image, price, quantity, title } =
      req.body;
    const cart = await Cart({
      category,
      description,
      u_id,
      image,
      price,
      quantity,
      title,
    }).save();

    res.status(201).send({
      success: true,
      message: "Cart Added Successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const cartDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOneAndDelete({ u_id: id });
    if (cart) {
      res.status(200).send({
        success: true,
        message: "cart removed Successfully",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "cart not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting cart",
      error,
    });
  }
};
