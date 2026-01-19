import axios from 'axios';
import * as request from '../utils';
import { isJsonString } from '../utils';

const apiBase = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const checkoutWithVNPAY = async (data) => {
  try {
        const res = await axios.post(`${apiBase}/checkout/create_payment_url`, data)
    return res.data;
  } catch (error) {
    console.log("lỗi ở checkoutvnpayservice", error)
    throw error;
  }
};