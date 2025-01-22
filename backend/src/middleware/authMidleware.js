const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()


const authMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(404).json({
                status: 'ERROR',
                message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
            })
        }
        const { payload } = user
        if(payload?.isAdmin){
            next()
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
            })
        }

      });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(404).json({
                status: 'ERROR',
                message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
            })
        }
        const { payload } = user
        if(payload?.isAdmin || payload?.id == userId){
            next()
        } else {
            return res.status(404).json({
                status: 'ERROR',
                message: 'LỖI RÙI, bạn hong phải Admin sao lại vào đâyyy?!!!'
            })
        }

      });
}

module.exports = {
    authMiddleWare,
    authUserMiddleware
}