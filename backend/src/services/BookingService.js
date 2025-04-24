const Booking = require("../models/Booking");
const User = require("../models/User");
const Meal = require("../models/Meal");
const Restaurant = require("../models/Restaurant");

const bookingTable = (data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { restaurant, floor, numberOfPeople, note, date, time, meals = [] } = data;

      if (!Number.isInteger(numberOfPeople) || numberOfPeople <= 0) {
        return resolve({
          status: "ERR",
          message: "Số người phải là một số nguyên dương!",
        });
      }

      const user = await User.findById(userId).select("name phone");
      if (!user) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy người dùng",
        });
      }

      const restaurantData = await Restaurant.findById(restaurant).select("name numberOfFloor timeAvailable");
      if (!restaurantData) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy nhà hàng",
        });
      }

      if (floor > restaurantData.numberOfFloor || floor <= 0) {
        return resolve({
          status: "ERR",
          message: `Tầng ${floor} không hợp lệ. Nhà hàng chỉ có ${restaurantData.numberOfFloor} tầng!`,
        });
      }

      if (!restaurantData.timeAvailable.includes(time)) {
        return resolve({
          status: "ERR",
          message: `Thời gian ${time} không khả dụng cho nhà hàng này!`,
        });
      }

      const existingBooking = await Booking.findOne({
        restaurant,
        floor,
        date,
        time,
        status: { $in: ["chờ xử lý", "đã xác nhận"] },
      });
      if (existingBooking) {
        return resolve({
          status: "ERR",
          message: `Tầng ${floor} tại thời gian ${time} ngày ${date} đã được đặt!`,
        });
      }

      let totalPrice = 0;
      let formattedMeals = [];

      if (meals.length > 0) {
        const mealIds = meals.map((item) => item.mealId);
        const foundMeals = await Meal.find({ _id: { $in: mealIds } }).select("price");

        if (foundMeals.length !== mealIds.length) {
          return resolve({
            status: "ERR",
            message: "Một hoặc nhiều món ăn không tồn tại!",
          });
        }

        const mealMap = new Map(foundMeals.map((meal) => [meal._id.toString(), meal.price]));

        formattedMeals = meals.map((item) => {
          const price = mealMap.get(item.mealId.toString());
          const quantity = Math.max(item.quantity || 1, 1);
          totalPrice += price * quantity;
          return {
            mealId: item.mealId,
            quantity,
          };
        });
      }

      const newBooking = await Booking.create({
        user: userId,
        restaurant,
        numberOfPeople,
        floor,
        date,
        time,
        note,
        meals: formattedMeals,
        totalPrice,
      });

      resolve({
        status: "SUCCESS",
        message: "Đặt bàn thành công",
        data: {
          ...newBooking._doc,
          restaurantName: restaurantData.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        },
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra trong quá trình đặt bàn",
      });
    }
  });
};

const updateBooking = (bookingId, data, userId, isAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { floor, numberOfPeople, note, date, time, meals = [], status, paymentMethod, paymentStatus } = data; // Thêm paymentMethod và paymentStatus

      if (!Number.isInteger(numberOfPeople) || numberOfPeople <= 0) {
        return resolve({
          status: "ERR",
          message: "Số người phải là một số nguyên dương!",
        });
      }

      const booking = await Booking.findById(bookingId).populate("restaurant", "name numberOfFloor timeAvailable");
      if (!booking) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy booking!",
        });
      }

      if (!isAdmin && booking.user.toString() !== userId) {
        return resolve({
          status: "ERR",
          message: "Bạn không có quyền sửa booking này!",
        });
      }

      const restaurantData = booking.restaurant;
      if (floor > restaurantData.numberOfFloor || floor <= 0) {
        return resolve({
          status: "ERR",
          message: `Tầng ${floor} không hợp lệ. Nhà hàng chỉ có ${restaurantData.numberOfFloor} tầng!`,
        });
      }

      if (!restaurantData.timeAvailable.includes(time)) {
        return resolve({
          status: "ERR",
          message: `Thời gian ${time} không khả dụng cho nhà hàng này!`,
        });
      }

      const existingBooking = await Booking.findOne({
        _id: { $ne: bookingId },
        restaurant: booking.restaurant,
        floor,
        date,
        time,
        status: { $in: ["chờ xử lý", "đã xác nhận"] },
      });
      if (existingBooking) {
        return resolve({
          status: "ERR",
          message: `Tầng ${floor} tại thời gian ${time} ngày ${date} đã được đặt!`,
        });
      }

      // Validation cho status
      const validStatuses = ["chờ xử lý", "đã xác nhận", "đã hủy"];
      if (status && !validStatuses.includes(status)) {
        return resolve({
          status: "ERR",
          message: `Trạng thái không hợp lệ! Trạng thái phải là một trong: ${validStatuses.join(", ")}`,
        });
      }

      // Validation cho paymentMethod
      const validPaymentMethods = ["tiền mặt", "chuyển khoản"];
      if (paymentMethod && !validPaymentMethods.includes(paymentMethod)) {
        return resolve({
          status: "ERR",
          message: `Phương thức thanh toán không hợp lệ! Phương thức phải là một trong: ${validPaymentMethods.join(", ")}`,
        });
      }

      // Validation cho paymentStatus
      const validPaymentStatuses = ["chờ xử lý", "đã thanh toán"];
      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return resolve({
          status: "ERR",
          message: `Trạng thái thanh toán không hợp lệ! Trạng thái phải là một trong: ${validPaymentStatuses.join(", ")}`,
        });
      }

      let totalPrice = 0;
      let formattedMeals = [];

      if (meals.length > 0) {
        const mealIds = meals.map((item) => item.mealId);
        const foundMeals = await Meal.find({ _id: { $in: mealIds } }).select("price");

        if (foundMeals.length !== mealIds.length) {
          return resolve({
            status: "ERR",
            message: "Một hoặc nhiều món ăn không tồn tại!",
          });
        }

        const mealMap = new Map(foundMeals.map((meal) => [meal._id.toString(), meal.price]));

        formattedMeals = meals.map((item) => {
          const price = mealMap.get(item.mealId.toString());
          const quantity = Math.max(item.quantity || 1, 1);
          totalPrice += price * quantity;
          return {
            mealId: item.mealId,
            quantity,
          };
        });
      }

      console.log(`Before update - Booking ${bookingId} status: ${booking.status}`); // Log trước khi cập nhật
      console.log(`Updating status to: ${status}`); // Log giá trị status mới
      console.log(`Updating paymentMethod to: ${paymentMethod}`); // Log paymentMethod
      console.log(`Updating paymentStatus to: ${paymentStatus}`); // Log paymentStatus

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          floor,
          numberOfPeople,
          date,
          time,
          note,
          meals: formattedMeals,
          totalPrice,
          status,
          paymentMethod, // Thêm paymentMethod
          paymentStatus, // Thêm paymentStatus
        },
        { new: true }
      );

      console.log(`After update - Booking ${bookingId} status: ${updatedBooking.status}`); // Log sau khi cập nhật
      console.log(`After update - Booking ${bookingId} paymentMethod: ${updatedBooking.paymentMethod}`); // Log paymentMethod
      console.log(`After update - Booking ${bookingId} paymentStatus: ${updatedBooking.paymentStatus}`); // Log paymentStatus

      const user = await User.findById(userId).select("name phone");

      resolve({
        status: "SUCCESS",
        message: "Cập nhật booking thành công",
        data: {
          ...updatedBooking._doc,
          restaurantName: restaurantData.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        },
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra trong quá trình cập nhật booking",
      });
    }
  });
};

const cancleBooking = (bookingId, userId, isAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findById(bookingId).populate("restaurant", "name");
      if (!booking) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy booking!",
        });
      }

      if (!isAdmin && booking.user.toString() !== userId) {
        return resolve({
          status: "ERR",
          message: "Bạn không có quyền hủy booking này!",
        });
      }

      if (booking.status === "đã hủy") {
        return resolve({
          status: "ERR",
          message: "Booking đã được hủy trước đó!",
        });
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "đã hủy" },
        { new: true }
      );

      const user = await User.findById(userId).select("name phone");

      resolve({
        status: "SUCCESS",
        message: "Hủy booking thành công",
        data: {
          ...updatedBooking._doc,
          restaurantName: booking.restaurant.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        },
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra trong quá trình hủy booking",
      });
    }
  });
};

const getBooking = (bookingId, userId, isAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findById(bookingId)
        .populate("restaurant", "name numberOfFloor timeAvailable")
        .populate("meals.mealId", "name price");

      if (!booking) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy booking!",
        });
      }

      if (!isAdmin && booking.user.toString() !== userId) {
        return resolve({
          status: "ERR",
          message: "Bạn không có quyền xem booking này!",
        });
      }

      const user = await User.findById(userId).select("name phone");

      // Định dạng lại meals, kiểm tra nếu meals không tồn tại
      const formattedMeals = booking.meals && Array.isArray(booking.meals)
        ? booking.meals.map((mealItem) => ({
            mealId: mealItem.mealId._id,
            name: mealItem.mealId.name,
            price: mealItem.mealId.price,
            quantity: mealItem.quantity,
          }))
        : [];

      resolve({
        status: "SUCCESS",
        message: "Lấy thông tin booking thành công",
        data: {
          ...booking._doc,
          meals: formattedMeals,
          restaurantName: booking.restaurant.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        },
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra khi lấy thông tin booking",
      });
    }
  });
};
const getMyBookings = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookings = await Booking.find({ user: userId })
        .populate("restaurant", "name")
        .populate("meals.mealId", "name price");

      const user = await User.findById(userId).select("name phone");

      resolve({
        status: "SUCCESS",
        message: "Lấy danh sách booking của bạn thành công",
        data: bookings.map((booking) => ({
          ...booking._doc,
          restaurantName: booking.restaurant.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        })),
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra khi lấy danh sách booking",
      });
    }
  });
};

const getAll = (userId, isAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!isAdmin) {
        return resolve({
          status: "ERR",
          message: "Bạn không có quyền xem tất cả booking!",
        });
      }

      const bookings = await Booking.find()
        .populate("restaurant", "name")
        .populate("meals.mealId", "name price")
        .populate("user", "name phone");

      resolve({
        status: "SUCCESS",
        message: "Lấy danh sách tất cả booking thành công",
        data: bookings.map((booking) => ({
          ...booking._doc,
          restaurantName: booking.restaurant ? booking.restaurant.name : "Không có tên nhà hàng",
          name: booking.user ? booking.user.name : "Không có tên",
          phone: booking.user ? booking.user.phone : "Không có số điện thoại",
        })),
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra khi lấy danh sách booking",
      });
    }
  });
};

const updateMeals = (bookingId, data, userId, isAdmin) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { meals = [], totalPrice } = data;

      const booking = await Booking.findById(bookingId).populate("restaurant", "name");
      if (!booking) {
        return resolve({
          status: "ERR",
          message: "Không tìm thấy booking!",
        });
      }

      if (!isAdmin && booking.user.toString() !== userId) {
        return resolve({
          status: "ERR",
          message: "Bạn không có quyền sửa booking này!",
        });
      }

      let formattedMeals = [];
      if (meals.length > 0) {
        const mealIds = meals.map((item) => item.mealId);
        const foundMeals = await Meal.find({ _id: { $in: mealIds } }).select("price");

        if (foundMeals.length !== mealIds.length) {
          return resolve({
            status: "ERR",
            message: "Một hoặc nhiều món ăn không tồn tại!",
          });
        }

        formattedMeals = meals.map((item) => ({
          mealId: item.mealId,
          quantity: Math.max(item.quantity || 1, 1),
        }));
      }

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          meals: formattedMeals,
          totalPrice,
        },
        { new: true }
      );

      const user = await User.findById(userId).select("name phone");

      resolve({
        status: "SUCCESS",
        message: "Cập nhật danh sách món ăn thành công",
        data: {
          ...updatedBooking._doc,
          restaurantName: booking.restaurant.name,
          name: user.name || "Không có tên",
          phone: user.phone || "Không có số điện thoại",
        },
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: e.message || "Có lỗi xảy ra trong quá trình cập nhật danh sách món ăn",
      });
    }
  });
};


const deleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBooking = await Booking.findOne({
        _id: id,
      });
      if (checkBooking === null) {
        resolve({
          status: "ERR",
          message: "Không có bàn đặt này!",
        });
      }
      await Booking.findByIdAndDelete(id);
      resolve({
        status: "SUCCESS",
        message: "Xóa thành công!",
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  bookingTable,
  updateBooking,
  cancleBooking,
  getBooking,
  getMyBookings,
  getAll,
  updateMeals,
  deleteBooking,
};