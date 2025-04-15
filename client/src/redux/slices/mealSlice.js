import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMeals: [], // Danh sách món ăn đã chọn: [{ mealId, quantity, name, price }, ...]
  totalPrice: 0, // Tổng giá
};

export const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    addMeal: (state, action) => {
      const { mealId, name, price } = action.payload;
      const existingMeal = state.selectedMeals.find((meal) => meal.mealId === mealId);

      if (existingMeal) {
        existingMeal.quantity += 1;
      } else {
        state.selectedMeals.push({ mealId, name, price, quantity: 1 });
      }

      state.totalPrice = state.selectedMeals.reduce(
        (total, meal) => total + meal.price * meal.quantity,
        0
      );
    },
    removeMeal: (state, action) => {
      const mealId = action.payload;
      state.selectedMeals = state.selectedMeals.filter((meal) => meal.mealId !== mealId);
      state.totalPrice = state.selectedMeals.reduce(
        (total, meal) => total + meal.price * meal.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { mealId, quantity } = action.payload;
      const meal = state.selectedMeals.find((meal) => meal.mealId === mealId);

      if (meal) {
        meal.quantity = quantity;
        if (meal.quantity <= 0) {
          state.selectedMeals = state.selectedMeals.filter((m) => m.mealId !== mealId);
        }
      }

      state.totalPrice = state.selectedMeals.reduce(
        (total, meal) => total + meal.price * meal.quantity,
        0
      );
    },
    resetMeals: (state) => {
      state.selectedMeals = [];
      state.totalPrice = 0;
    },
  },
});

export const { addMeal, removeMeal, updateQuantity, resetMeals } = mealSlice.actions;

export default mealSlice.reducer;