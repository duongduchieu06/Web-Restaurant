import axios from "axios";
// import { data } from "react-router-dom";

export const loginUser = async(data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/SignIn`, data )
    return res.data
}