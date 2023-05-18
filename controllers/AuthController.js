import User from "../model/userModel.js";
import { comparePassword, hashPassword } from "../helpers/AuthHelper.js";
import JWT from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, answer } = req.body;

    //check existing email
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "user already registered",
      });
    }
    //register user
    const hashPass = await hashPassword(password);

    const user = await User({
      name,
      email,
      password: hashPass,
      phone,
      address,
      role,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login Controller
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login succesfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const testController = (req, res) => {
  res.send("protected route");
  console.log("protectected route");
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      req.status(400).send({ message: "New Password is Required" });
    }

    //check
    const user = await User.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};
