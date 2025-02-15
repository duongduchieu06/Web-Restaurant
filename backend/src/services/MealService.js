const Meal = require("../models/Meal");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const createMeal = (newMeal) => {
  return new Promise(async (resolve, reject) => {
    const {name, image, type, price, desciption} = newMeal;
    try {
      const checkMeal = await Meal.findOne({
        name: name,
      });
      if (checkMeal !== null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Ủa đã có món này rùi mò",
        });
      }
      const createMeal = await Meal.create({
        name,
        image,
        type,
        price,
        desciption
      });
      if (createMeal) {
        resolve({
          status: "OK",
          message: "Tạo món thành công thành công",
          data: createMeal,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateMeal = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMeal = await Meal.findOne({
        _id: id,
      });
      console.log("check meal", checkMeal);
      if (checkMeal === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Khum có món ăn này, hãy thêm món ăn nếu bạn cần!",
        });
      }

      const updatedMeal = await Meal.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Cập nhật thành công",
        data: updatedMeal,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteMeal = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMeal = await Meal.findOne({
        _id: id,
      });
      if (checkMeal === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Không có món ăn này!",
        });
      }

      await Meal.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "Xóa thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getMeal = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const meal = await Meal.findOne({
        _id: id,
      });
      if (meal === null) {
        resolve({
          status: "THÔNG BÁO",
          message: "Không có món ăn này!",
        });
      }
      resolve({
        status: "-----",
        message: "Món ăn của mày nè:",
        data: meal
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allmeal = await Meal.find();
      resolve({
        status: "-----",
        message: "DANH SÁCH MÓN ĂN",
        data: allmeal
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
    createMeal,
    updateMeal,
    deleteMeal,
    getMeal,
    getAll
};
