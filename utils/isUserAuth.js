import jwt from "jsonwebtoken";
import { UserModel } from "../Models";

const isUserAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res.status(200).send("please Authenticate");
    }
    const decode = jwt.verify(token, "thisissecret");
    const user = await UserModel.findById({ _id: decode._id });
    if (!user) {
      return res.status(200).send("please Authenticate");
    }
    req.token = token;
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    console.log("cookie expire", error);
    return res.status(401).redirect("/login");
  }
};

module.exports = isUserAuth;
