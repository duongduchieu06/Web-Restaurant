import axios from "axios";
import { axiosJWT } from "./userservice";

export const bookingTable = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/booking/BookingTable`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateBooking = async (bookingId, data, access_token) => {
  console.log("Payload before sending in bookingservice:", data); // Thêm log
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/booking/UpdateBooking/${bookingId}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateMeals = async (bookingId, data, access_token) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/booking/UpdateMeals/${bookingId}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getBooking = async (bookingId, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/booking/GetBooking/${bookingId}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAll = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/booking/GetAll`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const cancleBooking = async (bookingId, access_token) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/booking/CancleBooking/${bookingId}`, {}, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getMyBookings = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/booking/GetMyBookings`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};