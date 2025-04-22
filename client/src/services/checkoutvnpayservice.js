import axios from 'axios';
import * as request from '../utils';
import { isJsonString } from '../utils';

export const checkoutWithVNPAY = async (data) => {
  try {
    console.log("hieu")
    // const res = await axios.post("http://localhost:3001/api/checkout/create_payment_url", data)
    const res = await axios.post("https://chopsvn.vercel.app/api/checkout/create_payment_url", data)
    window.location.href = res.data.paymentUrl;
  } catch (error) {
    console.log("loi vai o")
    throw error;
  }
};