import axios from 'axios';
import { axiosJWT } from './userservice';

export const getAllRestaurant = async (access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/GetAll`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const addRestaurant = async (data, access_token) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/restaurant/CreateRestaurant`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding Restaurant:', error);
        throw error;
    }
};

export const getDetailRestaurant = async (id, access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/restaurant/GetRestaurant/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return res.data;
};

export const updateRestaurant = async (id, data, access_token) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/restaurant/UpdateRestaurant/${id}`,
        data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};

export const deleteRestaurant = async (id, access_token) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/restaurant/DeleteRestaurant/${id}`,
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};