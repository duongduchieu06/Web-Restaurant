const UserService = require("../services/UserService")
const JwtService = require("../services/jwtService")

const createUser = async (req, res) => {
    try{
        // console.log(req.body)
        const {name, email, password, confirmPassword} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!name || !email || !password || !confirmPassword ){
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đầy đủ thông tin người dùng!'
            })
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đúng Email!'
            })
        } else if ( password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mật khẩu không trùng nhau!'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try{
        console.log(req.body)
        const {email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password){
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đầy đủ thông tin!'
            })
        }else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đúng Email!'
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy id người dùng  '
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy id người dùng  '
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try{
        const response = await UserService.getAll()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy id người dùng  '
            })
        }
        const response = await UserService.getUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try{
        const token = req.headers.token.split(' ')[1]
        if(!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Hong cóa Tô Ken '
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAll,
    getUser,
    refreshToken
}