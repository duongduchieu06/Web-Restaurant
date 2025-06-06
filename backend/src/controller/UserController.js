const UserService = require("../services/UserService");
const JwtService = require("../services/jwtService");

const createUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu nhập đầy đủ thông tin người dùng!",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu nhập đúng Email!",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "Mật khẩu không trùng nhau!",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "Yêu cầu nhập đầy đủ thông tin!",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "Yêu cầu nhập đúng Email!",
      });
    }
    const response = await UserService.loginUser(req.body);
if (response.status === "SUCCESS") {
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json(newResponse);
    }
    return res.status(400).json(response);
  } catch (e) {
    return res.status(500).json({
status: "ERR",
      message: "Lỗi server khi đăng nhập",
      error: e.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const phoneReg = /^\d+$/;
    const isCheckEmail = reg.test(data.email);
    const isCheckPhone = data.phone && phoneReg.test(data.phone) && data.phone.length > 9;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy id người dùng  ",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu nhập đúng Email!",
      });
    } else if ( !isCheckPhone ){
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu nhập đúng số điện thoại",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy id người dùng  ",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUser = async (req, res) => {
  try {
    console.log("getUser - User ID:", req.params.id);
    console.log("getUser - Request User:", req.user);
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy id người dùng",
      });
    }
    const response = await UserService.getUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("getUser - Error:", e.message);
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token
    if (!token) {
      return res.status(401).json({
        status: "ERR",
        message: "Không có refresh token",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    if (response.status === 'ERROR') {
      res.clearCookie('refresh_token')
    }
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Đăng xuất thành công!',
    });
  } catch (e) {
    return res.status(500).json({
      status: 'ERR',
      message: 'Lỗi server khi đăng xuất',
      error: e.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getAll,
  getUser,
  refreshToken,
};
