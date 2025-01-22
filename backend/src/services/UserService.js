const User = require("../models/User");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { genneralAcessToken, genneralRefreshToken } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser !== null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Email này đã được đăng ký",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const createUser = await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "Đăng ký thành công",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (loginUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = loginUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Email không khả dụng, vui lòng đăng ký!",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "THẤT BẠI",
          message: "Mật khẩu không đúng",
        });
      }
      const access_token = await genneralAcessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "Đăng nhập thành công",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      console.log("check user", checkUser);
      if (checkUser === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Email không khả dụng, vui lòng đăng ký!",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Cập nhật thành công",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Không có người dùng này!",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const alluser = await User.find();
      resolve({
        status: "-----",
        message: "DANH SÁCH USER",
        data: alluser
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Không có người dùng này!",
        });
      }
      resolve({
        status: "-----",
        message: "NGƯỜI DÙNG:",
        data: user
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAll,
  getUser,
};
