import axios from 'axios';
import { axiosJWT } from './userservice';

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

export const updateMeal = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/meal/UpdateMeal/${id}`, data , {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};


export const deleteMeal = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/meal/DeleteMeal/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
