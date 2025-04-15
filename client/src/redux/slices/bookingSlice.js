import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [], // Lưu danh sách booking
  selectedBooking: {
    id: "",
    restaurantId: "",
    restaurantName: "",
    floor: 0,
    numberOfPeople: 0,
    date: "",
    time: "",
    note: "",
    meals: [], // Danh sách meals nếu có
    totalPrice: 0,
    status: "chờ xử lý", // Giá trị mặc định
    paymentMethod: "tiền mặt", // Thêm paymentMethod
    paymentStatus: "chờ xử lý", // Thêm paymentStatus
    userName: "",
    userPhone: "",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Cập nhật danh sách booking (VD: từ GetMyBookings)
    updateBookings: (state, action) => {
      state.bookings = action.payload.map((booking) => ({
        id: booking._id || "",
        restaurantId: booking.restaurant || "",
        restaurantName: booking.restaurantName || "",
        floor: booking.floor || 0,
        numberOfPeople: booking.numberOfPeople || 0,
        date: booking.date || "",
        time: booking.time || "",
        note: booking.note || "",
        meals: booking.meals || [],
        totalPrice: booking.totalPrice || 0,
        status: booking.status || "chờ xử lý",
        paymentMethod: booking.paymentMethod || "tiền mặt", // Thêm paymentMethod
        paymentStatus: booking.paymentStatus || "chờ xử lý", // Thêm paymentStatus
        userName: booking.name || "",
        userPhone: booking.phone || "",
      }));
    },
    // Cập nhật một booking cụ thể (VD: từ GetBooking)
    updateSelectedBooking: (state, action) => {
      const {
        _id = "",
        restaurant = "",
        restaurantName = "",
        floor = 0,
        numberOfPeople = 0,
        date = "",
        time = "",
        note = "",
        meals = [],
        totalPrice = 0,
        status = "chờ xử lý",
        paymentMethod = "tiền mặt", // Thêm paymentMethod
        paymentStatus = "chờ xử lý", // Thêm paymentStatus
        name = "",
        phone = "",
      } = action.payload;
      state.selectedBooking = {
        id: _id,
        restaurantId: restaurant,
        restaurantName,
        floor,
        numberOfPeople,
        date,
        time,
        note,
        meals,
        totalPrice,
        status,
        paymentMethod, // Thêm paymentMethod
        paymentStatus, // Thêm paymentStatus
        userName: name,
        userPhone: phone,
      };
    },
    // Reset danh sách booking
    resetBookings: (state) => {
      state.bookings = [];
    },
    // Reset selected booking
    resetSelectedBooking: (state) => {
      state.selectedBooking = {
        id: "",
        restaurantId: "",
        restaurantName: "",
        floor: 0,
        numberOfPeople: 0,
        date: "",
        time: "",
        note: "",
        meals: [],
        totalPrice: 0,
        status: "chờ xử lý",
        paymentMethod: "tiền mặt", // Thêm paymentMethod
        paymentStatus: "chờ xử lý", // Thêm paymentStatus
        userName: "",
        userPhone: "",
      };
    },
  },
});

// Action creators
export const { updateBookings, updateSelectedBooking, resetBookings, resetSelectedBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;