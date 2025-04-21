// const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');
// dotenv.config()

// const authMiddleWare = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1]
//     jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
//         if(err){
//             return res.status(404).json({
//                 status: 'ERR',
//                 message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
//             })
//         }
//         // const { payload } = user
//         if(user?.isAdmin){
//             next()
//         } else {
//             return res.status(404).json({
//                 status: 'ERR',
//                 message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
//             })
//         }

//       });
// }

// const authUserMiddleware = (req, res, next) => {
//     console.log("req.header", req.headers)
//     const token = req.headers.token.split(' ')[1]
//     const userId = req.params.id
//     // console.log('req.params.id', req.params.id)
//     jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
//         if(err){
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
//             })
//         }
//         // const { payload } = user
//         console.log("user", user)
//         if(user?.isAdmin || user?.id == userId){
//             next()
//         } else {
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
//             })
//         }

//       });
// }

// module.exports = {
//     authMiddleWare,
//     authUserMiddleware
// }

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {

  const token = req.headers.token?.split(" ")[1]; // Dùng optional chaining để tránh lỗi

  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "Không tìm thấy token, vui lòng đăng nhập!",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "ERR",
        message: "Token không hợp lệ hoặc đã hết hạn!",
      });
    }

    if (user?.isAdmin) {
      req.user = { id: user.id, isAdmin: user.isAdmin };
      next();
    } else {
      return res.status(403).json({
        status: "ERR",
        message: "Bạn không phải Admin, không có quyền truy cập!",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  console.log("authUserMiddleware - Headers:", req.headers);
  const token = req.headers.token?.split(" ")[1];
  console.log("authUserMiddleware - Token:", token);
  if (!token) {
    return res.status(401).json({
      status: "ERR",
      message: "Không tìm thấy token, vui lòng đăng nhập!",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.error("authUserMiddleware - JWT Verify Error:", err.message);
      return res.status(403).json({
        status: "ERR",
        message: "Token không hợp lệ hoặc đã hết hạn!",
      });
    }
    console.log("authUserMiddleware - Decoded User:", user);
    req.user = { id: user.id, isAdmin: user.isAdmin || false };
    next();
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleware,
};