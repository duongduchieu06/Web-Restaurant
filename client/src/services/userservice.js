import axios from "axios";
// import { data } from "react-router-dom";

export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://chopsvn.vercel.app/api",
});

export const loginUser = async(data) => {
    console.log("hieu da o dayaaaa")
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/SignIn`, data )
    return res.data
}

export const signUpUser = async(data) => {
    console.log("hieu da o dayaaaa")
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/SignUp`, data )
    return res.data
    
}

export const getDetailUser = async(id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/GetUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const refreshToken = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/RefreshToken`, {}, {
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async() => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/LogOut`)
    return res.data
}

export const updateUser = async(id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/UpdateUser/${id}`, data , {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllUser = async() => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user//GetAll`)
    return res.data
}

export const deleteUser = async(id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/DeleteUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

