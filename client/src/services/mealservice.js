import axios from 'axios';

export const getAllMeal = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/GetAll`);
    return res.data;
};

export const addMeal = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/meal/CreateMeal`, data);
        return response.data;
    } catch (error) {
        console.error('Error adding meal:', error);
        throw error;
    }
};

export const getDetailMeal = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/meal/GetMeal/${id}`);
    return res.data;
};


