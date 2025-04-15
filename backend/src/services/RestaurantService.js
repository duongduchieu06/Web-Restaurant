const Restaurant = require("../models/Restaurant");

const createRestaurant = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, numberOfFloor, timeAvailable } = data;

      if (!name || !numberOfFloor || !timeAvailable || !Array.isArray(timeAvailable)) {
        return resolve({
          status: "ERR",
          message: "Vui lòng cung cấp đầy đủ thông tin: tên, số tầng và danh sách thời gian khả dụng!",
        });
      }

      const existingRestaurant = await Restaurant.findOne({ name });
      if (existingRestaurant) {
        return resolve({
          status: "ERR",
          message: "Tên nhà hàng đã tồn tại, vui lòng chọn tên khác!",
        });
      }

      if (numberOfFloor <= 0) {
        return resolve({
          status: "ERR",
          message: "Số tầng phải là số dương!",
        });
      }

      if (timeAvailable.length === 0) {
        return resolve({
          status: "ERR",
          message: "Danh sách thời gian khả dụng không được để trống!",
        });
      }

      const newRestaurant = await Restaurant.create({
        name,
        numberOfFloor,
        timeAvailable,
      });

      resolve({
        status: "SUCCESS",
        message: "Tạo nhà hàng thành công",
        data: newRestaurant,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateRestaurant = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, numberOfFloor, timeAvailable } = data;

      // Kiểm tra dữ liệu đầu vào (các trường là tùy chọn)
      if ((numberOfFloor && numberOfFloor <= 0) || (timeAvailable && !Array.isArray(timeAvailable))) {
        return resolve({
          status: "ERR",
          message: "Dữ liệu không hợp lệ: số tầng phải là số dương và timeAvailable phải là mảng!",
        });
      }

      // Kiểm tra xem tên mới (nếu có) đã tồn tại chưa
      if (name) {
        const existingRestaurant = await Restaurant.findOne({ name, _id: { $ne: id } });
        if (existingRestaurant) {
          return resolve({
            status: "ERR",
            message: "Tên nhà hàng đã tồn tại, vui lòng chọn tên khác!",
          });
        }
      }

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        { name, numberOfFloor, timeAvailable },
        { new: true, runValidators: true }
      );

      if (!updatedRestaurant) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy nhà hàng để cập nhật!",
        });
      }

      resolve({
        status: "SUCCESS",
        message: "Cập nhật nhà hàng thành công",
        data: updatedRestaurant,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRestaurant = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

      if (!deletedRestaurant) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy nhà hàng để xóa!",
        });
      }

      resolve({
        status: "SUCCESS",
        message: "Xóa nhà hàng thành công",
        data: deletedRestaurant,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRestaurant = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const restaurant = await Restaurant.findById(id);

      if (!restaurant) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy nhà hàng!",
        });
      }

      resolve({
        status: "SUCCESS",
        message: "Lấy thông tin nhà hàng thành công",
        data: restaurant,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRestaurants = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const restaurants = await Restaurant.find();

      resolve({
        status: "SUCCESS",
        message: "Lấy danh sách nhà hàng thành công",
        data: restaurants,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  getAllRestaurants,
};