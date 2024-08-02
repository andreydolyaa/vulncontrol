import { userMsg } from "../constants/messages.js";
import { User } from "../models/userModel.js";

export const login = async (req, res, next) => {
  return res.status(200).send("login");
};

export const logout = async (req, res, next) => {
  return res.status(200).send("logout");
};

export const register = async (req, res, next) => {
  try {
    await User.create({ ...req.body });
    return res.status(200).send({ message: userMsg.REGISTER_SUCCESS });
  } catch (error) {
    if (!!error && error.errorResponse?.code === 11000) {
      return res.status(400).send({ message: userMsg.REGISTER_EXISTS });
    }
    return res.status(400).send({ message: userMsg.REGISTER_FAILED, error });
  }
};
