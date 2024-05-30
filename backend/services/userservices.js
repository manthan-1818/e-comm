const TempUser = require("../models/Tempuser");
const User = require("../models/user");

const userService = {
  register: async (userData) => {
    try {
      const createUser = await TempUser.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        verificationToken: userData.token,
      });
      return createUser;
    } catch (error) {
      console.log("user service register error ", error);
      throw error;
    }
  },
  login: async (userData) => {
    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return { success: false, message: "Login failed" };
      }
      if (user.password === userData.password) {
        console.log("Login successful");
        return {
          success: true,
          message: "Login successful",
          user: user,
        };
      } else {
        console.log("Invalid credentials");
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.log("userService login error:", error);
      throw error;
    }
  },
  getUserData: async () => {
    try {
      const userData = await User.find({});
      return userData;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = userService;
