import axios from 'axios'

export const getAllMeal = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/GetAll`)
    return res.data
}