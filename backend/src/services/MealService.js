const Meal = require("../models/Meal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createMeal = (newMeal) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, description } = newMeal;
    try {
      const checkMeal = await Meal.findOne({
        name: name,
      });
      if (checkMeal !== null) {
        resolve({
          status: "ERR",
          message: "Món ăn đã tồn tại, vui lòng đổi tên món ăn",
        });
      }
      const createMeal = await Meal.create({
        name,
        image,
        type,
        price,
        description,
      });
      if (createMeal) {
        resolve({
          status: "SUCCESS",
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
          status: "ERR",
          message: "Khum có món ăn này, hãy thêm món ăn nếu bạn cần!",
        });
      } else if (!data.name || !data.price) {
        resolve({
          status: "ERR",
          message: "Vui lòng cung cấp đầy đủ tên và giá món ăn"
        });
        return;
      }
      const updatedMeal = await Meal.findByIdAndUpdate(id, data, { new: true });
      resolve({
        status: "SUCCESS",
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
          status: "ERR",
          message: "Không có món ăn này!",
        });
      }

      await Meal.findByIdAndDelete(id);

      resolve({
        status: "SUCCESS",
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
          status: "ERR",
          message: "Không có món ăn này!",
        });
      }
      resolve({
        status: "SUCCESS",
        message: "Món ăn của nè:",
        data: meal,
      });
    } catch (e) {
      reject(e);
    }
  });
};

// const getAll = ( limit, page, sort, filter ) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const totalMeal = await Meal.countDocuments()
//       if(filter){
//         const label = filter[0]
//         const allmealFilter = await Meal.find({ [label]: { '$regex': filter[1]}}).limit(limit).skip( page * limit )
//         resolve({
//           status: "SUCCESS",
//           message: "DANH SÁCH MÓN ĂN",
//           data: allmealFilter,
//           total: totalMeal,
//           pageCurrent: page + 1,
//           pageTotal: Math.ceil(totalMeal / limit),
//         }); 
//       }
//       if(sort) {
//         const objectSort = {}
//         objectSort[sort[0]] = sort[1]
//         const allmealSort = await Meal.find().limit(limit).skip( page * limit ).sort(objectSort)
//         resolve({
//           status: "SUCCESS",
//           message: "DANH SÁCH MÓN ĂN",
//           data: allmealSort,
//           total: totalMeal,
//           pageCurrent: page + 1,
//           pageTotal: Math.ceil(totalMeal / limit),
//         }); 
//       }
//       const allmeal = await Meal.find().limit(limit).skip( page * limit)
//       resolve({
//         status: "SUCCESS",
//         message: "DANH SÁCH MÓN ĂN",
//         data: allmeal,
//         total: totalMeal,
//         pageCurrent: page + 1,
//         pageTotal: Math.ceil(totalMeal / limit),
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalMeal = await Meal.countDocuments();
      const allmeal = await Meal.find();
      resolve({
        status: "SUCCESS",
        message: "DANH SÁCH MÓN ĂN",
        data: allmeal,
        total: totalMeal,
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
  getAll,
};
