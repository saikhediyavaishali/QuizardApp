const userSchema = require("../models/userSchema");
const { unlinkSync } = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../services/mailService");

const userSignup = async (req, res) => {
  const userData = new userSchema(req.body);
  try {
    const isUserExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isUserExist) {
      req.file ? unlinkSync(req.file.path) : null; //Delete multer unnecessary uploaded photo
      res.status(401).json({
        success: false,
        message: "User is already registered with this email",
      });
    } else {
      if (req.file !== undefined) {
        userData.profilePic = `${req.file.path}`;
      }
      const hashPassword = await bcrypt.hash(req.body.userPassword, 10);
      userData.userPassword = hashPassword;
      const user = await userData.save();
      res.status(201).json({
        success: true,
        message: "User successfully registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const userData = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (userData) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        userData.userPassword
      );
      if (userData && hashPassword) {
        const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          success: true,
          message: "Login successfully",
          userData: userData,
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "User is not registered with this email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const forgetPassword = async (req, res) => {
  const {email}  = req.body;
 console.log(email)
  try {
    const user = await userSchema.findOne({ userEmail: email });
    if (user) {
      const secretKey = user._id + process.env.SECRET_KEY;
      const token = jwt.sign({ user }, secretKey, { expiresIn: "5m" });
      mail.sendMail(token, user._id, email);
      res.status(200).json({
        success: true,
        message: "Reset password link sent successfully",
        token: token,
        userId: user._id,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Email is not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const isUserExist = await userSchema.findById({ _id: id });
    if (newPassword && confirmPassword) {
      const secretKey = isUserExist._id + process.env.SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword == confirmPassword) {
        const hashPassword = await bcrypt.hash(confirmPassword, 10);
        await userSchema.findOneAndUpdate(isUserExist._id, {
          $set: { userPassword: hashPassword },
        });
        res.status(201).json({
          success: true,
          message: "Password reset successfully",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "New Password and confirm password are not same",
        });
      }
    } else {
      res.status(409).json({
        success: false,
        message: "All fields required",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error occur ${error.message}`,
    });
  }
};

module.exports = { userSignup, userLogin, forgetPassword, resetPassword };
