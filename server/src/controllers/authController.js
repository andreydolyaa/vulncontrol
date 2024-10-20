import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { userMsg } from "../constants/messages.js";
import { User } from "../models/userModel.js";
// import { sleep } from "../utils/index.js";

// TODO: make the rest response messages constants

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
        const userCopy = JSON.parse(JSON.stringify(user));
        delete userCopy.password;
        const token = JWT.sign({ user: userCopy }, process.env.JWT_SECRET, {
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

export const logout = async (req, res) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.user?.id;

    if (!userId) {
      return res.status(401).send({ message: "Failed to verify token" });
    }

    const user = await User.findOneAndUpdate(
      { id: userId },
      { isLoggedIn: false },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    delete user.password;
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Could not log out user", error: error.message });
  }
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

export const getLoggedUser = async (req, res) => {
  try {
    // TODO: for loading screens
    // await sleep(1500)
    let token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    if (!decoded?.user) {
      return res.status(401).send({ message: "Failed to verify token" });
    }

    const user = await User.findOne({ id: decoded.user.id }).lean();
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user.isLoggedIn) {
      return res.status(401).send({ message: "User is not logged in" });
    }

    delete user.password;
    return res
      .status(200)
      .send({ message: "Retrieved user successfully", user });
  } catch (error) {
    return res.status(500).send({ message: "Login failed", error });
  }
};
