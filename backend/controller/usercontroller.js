const jwt = require("jsonwebtoken");
const userService = require("../services/userservices");
const sendVerificationEmail = require("../config/emailconfig");

const verifyKey = process.env.VERIFY_SECRET;
const jwtKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;

const {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  MSG_REGISTER_SUCCESS,
  MSG_LOGIN_SUCCESS,
  MSG_EMAIL_NOT_VERIFIED,
  MSG_INCORRECT_PASSWORD,
  MSG_USER_NOT_FOUND,
  MSG_EMAIL_VERIFIED,
  MSG_NO_USER_DATA_FOUND,
  MSG_USER_UPDATED,
  MSG_USER_DELETED,
  MSG_ACCESS_TOKEN_REFRESHED,
  MSG_REFRESH_TOKEN_EXPIRED,
  MSG_INVALID_REFRESH_TOKEN,
  MSG_INTERNAL_SERVER_ERROR,
} = require("../constant/constantError");

const userController = {
  signup: async (req, res) => {
    try {
      const { name, email, role, password } = req.body;
      const token = jwt.sign({ email }, verifyKey, { expiresIn: "5m" });

      const response = await userService.signup({
        name,
        email,
        password,
        role,
        token,
      });

      await sendVerificationEmail({ email }, token);

      res.status(STATUS_SUCCESS).json({ message: MSG_REGISTER_SUCCESS });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });

      if (userData.success) {
        const accessToken = jwt.sign({ email: userData.user.email }, jwtKey, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        });
        const refreshToken = jwt.sign(
          { email: userData.user.email },
          jwtRefreshKey,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
        );

        res.status(STATUS_SUCCESS).json({
          success: true,
          message: MSG_LOGIN_SUCCESS,
          accessToken,
          refreshToken,
          user: userData.user,
        });
      } else {
        const statusCode =
          userData.message === MSG_USER_NOT_FOUND
            ? STATUS_NOT_FOUND
            : STATUS_UNAUTHORIZED;
        res
          .status(statusCode)
          .json({ success: false, message: userData.message });
      }
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  },

  verify: async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, verifyKey);
      const user = await userService.verify({ email: decoded.email });

      if (user) {
        res.redirect(`${process.env.CLIENT_URL}/verification-mail`);
      } else {
        res.status(STATUS_BAD_REQUEST).json({ message: MSG_EMAIL_VERIFIED });
      }
    } catch (error) {
      console.error("Verification error:", error);
      res.status(STATUS_BAD_REQUEST).json({ message: error.message });
    }
  },

  getUserData: async (req, res) => {
    try {
      const userData = await userService.getUserData();
      if (userData && userData.length > 0) {
        res.status(STATUS_SUCCESS).json({ data: userData });
      } else {
        res.status(STATUS_NOT_FOUND).json({ message: MSG_NO_USER_DATA_FOUND });
      }
    } catch (error) {
      console.error("Get user data error:", error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  },

  updateData: async (req, res) => {
    const { id } = req.query;
    try {
      const { name, email, role } = req.body;
      const response = await userService.updateData({ id, name, email, role });
      res
        .status(STATUS_SUCCESS)
        .json({ message: MSG_USER_UPDATED, updatedUser: response });
    } catch (error) {
      console.error("Update user data error:", error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  },

  deleteData: async (req, res) => {
    try {
      const { id } = req.query;
      const response = await userService.deleteData(id);
      res
        .status(STATUS_SUCCESS)
        .json({ message: MSG_USER_DELETED, deletedUser: response });
    } catch (error) {
      console.error("Delete user data error:", error);
      res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: MSG_INTERNAL_SERVER_ERROR });
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.headers["refresh-token"];
    try {
      const decoded = jwt.verify(refreshToken, jwtRefreshKey);
      const newAccessToken = jwt.sign({ email: decoded.email }, jwtKey, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      });
      res.status(STATUS_SUCCESS).json({
        message: MSG_ACCESS_TOKEN_REFRESHED,
        accessToken: newAccessToken,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res
          .status(STATUS_UNAUTHORIZED)
          .json({ message: MSG_REFRESH_TOKEN_EXPIRED });
      } else if (error.name === "JsonWebTokenError") {
        res
          .status(STATUS_UNAUTHORIZED)
          .json({ message: MSG_INVALID_REFRESH_TOKEN });
      } else {
        console.error("Error refreshing access token:", error);
        res
          .status(STATUS_INTERNAL_SERVER_ERROR)
          .json({ message: MSG_INTERNAL_SERVER_ERROR });
      }
    }
  },
};

module.exports = userController;
