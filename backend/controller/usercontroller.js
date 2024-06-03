const userService = require("../services/userservices");
const sendVerificationEmail = require("../config/emailconfig");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const TempUser = require("../models/Tempuser");
const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

const userController = {
  signup: async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
      const token = jwt.sign({ email }, verifyKey, {
        expiresIn: "5m",
      });

      const response = await userService.register({
        name,
        email,
        password,
        role,
        token,
      });
      await sendVerificationEmail(response, token);

      res.status(200).json(response);
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: "internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });
      console.log("userData:", userData);

      if (userData.success) {
        const expiresIn = "15m";
        // const role = userData.user.role;
        const email = userData.user.email;
        const accessToken = jwt.sign({ email }, jwtKey, {
          expiresIn,
        });

        const refreshToken = jwt.sign(
          { email: userData.user.email },
          jwtRefreshKey,
          { expiresIn: "60m" }
        );

        res.status(200).json({
          success: true,
          message: userData.message,
          accessToken,
          refreshToken,
          // user: { ...userData.user, role },
        });
      } else {
        let statusCode = 401;
        if (userData.message === "Login failed") {
          statusCode = 404;
        }
        res
          .status(statusCode)
          .json({ success: false, message: userData.message });
      }
    } catch (error) {
      console.error(`login controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserData: async (req, res) => {
    try {
      const data = await userService.getUserData();
      if (data && data.length > 0) {
        res.status(200).json({ data });
      } else {
        res.status(404).json({ message: "No user data found" });
      }
    } catch (e) {
      res.status(500).json({ message: "internal server error" });
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, verifyKey);
  
      const tempUser = await TempUser.findOne({ verificationToken: token });
  
      if (!tempUser || tempUser.email !== decoded.email) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
  
      const user = new User({
        email: tempUser.email,
        password: tempUser.password,
        name: tempUser.name,
        role: tempUser.role,
      });
      await user.save();
  
      await TempUser.deleteOne({ _id: tempUser._id });
  
      // Send JSON response with the URL
      res.redirectUrl("http://localhost:3000/verification-mail");
    } catch (error) {
      console.error("Verification error:", error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
