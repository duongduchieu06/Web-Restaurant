import axios from "axios";
// import { data } from "react-router-dom";

export const loginUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/SignIn`, data )
    return res.data
}

export const signUpUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/SignUp`, data )
    return res.data
}

export const getDetailUser = async(id, access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/GetUser/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}