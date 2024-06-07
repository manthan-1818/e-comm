const User = require("../models/user");
const {MSG_USER_NOT_FOUND, MSG_INCORRECT_PASSWORD, MSG_EMAIL_NOT_VERIFIED, MSG_LOGIN_SUCCESS} = require('../constant/constantError');

const userService = {
    signup: async ({ name, email, password, role,  token }) => {
    try {
      const newUser = new User({
        name,
        email,
        password,
        role,
        verified: false
      });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error('User service register error:', error);
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { success: false, message: MSG_USER_NOT_FOUND };
      }

      if (user.password !== password) {
        return { success: false, message: MSG_INCORRECT_PASSWORD };
      }

      if (!user.verified) {
        return { success: false, message: MSG_EMAIL_NOT_VERIFIED };
      }

      return { success: true, message: MSG_LOGIN_SUCCESS, user };
    } catch (error) {
      console.error('User service login error:', error);
      throw error;
    }
  },

  verify: async ({ email }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return null;
      }
      if (user.verified) {
        return null;
      }

      user.verified = true;
      await user.save();
      return user;
    } catch (error) {
      console.error('User service verify error:', error);
      throw error;
    }
  },

  getUserData: async () => {
    try {
      const userData = await User.find({});
      return userData;
    } catch (error) {
      console.error('Get user data error:', error);
      throw error;
    }
  },

  updateData: async ({ id, name, email, role }) => {
    try {
      const updateFields = { name, email, role };
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
      return updatedUser;
    } catch (error) {
      console.error('Update user data error:', error);
      throw error;
    }
  },

  deleteData: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      console.error('Delete user data error:', error);
      throw error;
    }
  }
};

module.exports = userService;
