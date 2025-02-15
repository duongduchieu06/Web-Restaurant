const MealService = require("../services/MealService")
const JwtService = require("../services/jwtService")

const createMeal = async (req, res) => {
    try{
        const {name, image, type, price, desciption} = req.body
        console.log('req.body', req.body)
        if (!name || !image || !type || !price ){
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu nhập đầy đủ thông tin món ăn!'
            })
        }
        const response = await MealService.createMeal(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateMeal = async (req, res) => {
    try{
        const mealId = req.params.id
        const data = req.body
        if(!mealId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy món ăn'
            })
        }
        const response = await MealService.updateMeal(mealId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMeal = async (req, res) => {
    try{
        const mealId = req.params.id
        if(!mealId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy món ăn'
            })
        }
        const response = await MealService.deleteMeal(mealId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getMeal = async (req, res) => {
    try{
        const mealId = req.params.id
        if(!mealId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không tìm thấy món ăn'
            })
        }
        const response = await MealService.getMeal(mealId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAll = async (req, res) => {
    try{
        const response = await MealService.getAll()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createMeal,
    updateMeal,
    deleteMeal,
    getMeal,
    getAll
}