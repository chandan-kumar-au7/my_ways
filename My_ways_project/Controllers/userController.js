import bcrypt from "bcryptjs";
import { UserModel } from "../Models";
import { SEND_EMAIL_WITH_OTP } from "../utils/generateEmail";

const findByCredentials = async function (email, password) {
  // console.log(email, password);
  const user = await UserModel.findOne({ email });
  if (!user) {
    console.log("Wrong Email");
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Wrong Password");
    throw new Error("Unable to login");
  }
  return user;
};

class UserAuthController {
  async signup(req, res, next) {
    try {
      const user = new UserModel(req.body);

      const generateOTP = () => {
        // console.log("generateOTP func run");
        const digits = "0123456789";
        let OTP = "";

        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };

      const OTP = generateOTP();
      user.otp = OTP;

      await user.save();

      res.status(201).json({
        message: "User Registered Successfully",
        otp_related_message:
          "OTP Sent to Your Email , Fill That For Go Further ",
      });

      SEND_EMAIL_WITH_OTP(req.body.first_name, req.body.email, OTP);

      const helper = () => {
        user.otp = "";
        user.save();
      };
      setTimeout(function () {
        helper();
      }, 120000);

      // ========{{{{{{{{{{}}}}}}}}}}========
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        res.clearCookie("auth");
        return res.status(200).send("User already exit");
      }
      res.status(500).send(error.message);
    }
  }

  async signin(req, res, next) {
    try {
      let token = req.cookies.auth;

      const user = await findByCredentials(req.body.email, req.body.password);

      if (user) {
        if (token) {
          return res.json({ message: "Already Logged In" });
        } else {
          const token = await user.genrateAuthToken();

          res.cookie("auth", token, { maxage: "12h" });
          res.cookie("logedInAs", user.type, { maxage: "12h" });
          res
            .status(200)
            .json({ message: "Student Logged In Successfully", token: token });
        }
      } else {
        return res.send("Invalid Credentials !!");
      }
    } catch (error) {
      res.status(200).send("Invalid Credentials !!");
    }
  }

  async logout(req, res, next) {
    try {
      let token = req.cookies.auth;
      if (!token) {
        return res.json({ message: "Already Logged Out" });
      } else {
        res.clearCookie("auth");
        res.clearCookie("logedInAs");
        res.status(200).json({
          message: "Student Logged Out Successfully",
        });
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async forgotpassword(req, res, next) {
    try {
      UserModel.findByIdAndUpdate(
        req.user._id,
        { password: await bcrypt.hash(req.body.password, 8) },
        () => {
          res.clearCookie("auth");
          res.clearCookie("logedInAs");
          res.status(200).json({
            message: "Password Updated successfully",
          });
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async otpvarify(req, res, next) {
    try {
      const OTP = req.body.otp;
      const _id = req.user._id;
      if (OTP) {
        const USER = await UserModel.findOne({ _id });
        if (!USER.email_varified) {
          if (USER.otp == Number(OTP)) {
            // console.log(USER);
            UserModel.findByIdAndUpdate(
              req.user._id,
              { email_varified: true, otp: "" },
              () => {
                return res.status(200).json({
                  message: "Your Account Is Activated Now , Go Ahead ...",
                });
              }
            );
          } else {
            return res.send(
              "Your OTP Does Not Match , So Sorry ... You Can't Continue ... May Be It Got Expired ..."
            );
          }
        } else {
          return res.send("Already Varified");
        }
      } else {
        return res.send("Enter OTP , Without OTP You Can't Continue");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new UserAuthController();
