import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  numberOfFloor: 0,
  timeAvailable: [],
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    updateRestaurant: (state, action) => {
      const {
        _id = "",
        name = "",
        numberOfFloor = 0,
        timeAvailable = [],
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.numberOfFloor = numberOfFloor;
      state.timeAvailable = timeAvailable;
    },
    resetRestaurant: (state) => {
      state.id = "";
      state.name = "";
      state.numberOfFloor = 0;
      state.timeAvailable = [];
    },
  },
});

// Action creators
export const { updateRestaurant, resetRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;