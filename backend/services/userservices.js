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
  updateData: async ({ id, name, email, role }) => {
    console.log("bla", id, name, email, role);
    if (role) {
      role = role.value;
    }
    try {
      let updateFields = { name, email, role };

      const updateUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      return updateUser;
    } catch (error) {
      console.log("user service register error ", error);
      throw error;
    }
  },
  deleteData: async (id) => {
    try {
      const deleteUserData = await User.findByIdAndDelete(id);
      return deleteUserData;
    } catch (error) {
      console.log("getting blog Data error ", error);
      throw error;
    }
  },
};

module.exports = userService;
