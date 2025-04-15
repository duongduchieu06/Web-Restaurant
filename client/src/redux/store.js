import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import restaurantReducer from "./slices/restaurantSlice"
import mealReducer from "./slices/mealSlice";

export const store = configureStore ({
    reducer: {
        user: userReducer,
        restaurant: restaurantReducer,
        meal: mealReducer,
    },
})