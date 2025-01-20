const User = require("../models/User");
const bcrypt = require("bcrypt");
const { genneralAcessToken, genneralRefreshToken } = require("./jwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password } = newUser;
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
        isAdmin: checkUser.isAdmin
      })

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })

      resolve({
        status: "OK",
        message: "Đăng nhập thành công",
        access_token,
        refresh_token
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
