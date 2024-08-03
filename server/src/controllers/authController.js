import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { userMsg } from "../constants/messages.js";
import { User } from "../models/userModel.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(userMsg.LOGIN_FAILED);
    } else {
      const match = await bcrypt.compare(password, user?.password);
      if (match) {
        await User.updateOne({ isLoggedIn: true });
        delete user.password;
        const token = JWT.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).send({ message: userMsg.LOGIN_SUCCESS, token });
      } else {
        throw new Error(userMsg.LOGIN_FAILED);
      }
    }
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

export const logout = async (req, res, next) => {
  return res.status(200).send("logout");
};

export const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hashedPassword });
    return res.status(200).send({ message: userMsg.REGISTER_SUCCESS });
  } catch (error) {
    if (!!error && error.errorResponse?.code === 11000) {
      return res.status(400).send({ message: userMsg.REGISTER_EXISTS });
    }
    return res.status(400).send({ message: userMsg.REGISTER_FAILED, error });
  }
};
