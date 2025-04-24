const BookingService = require("../services/BookingService");

const bookingTable = async (req, res) => {
  try {
    const { restaurant, floor, numberOfPeople, note, date, time, meals } = req.body;
    if (!restaurant || !floor || !numberOfPeople || !date || !time) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp đầy đủ thông tin: nhà hàng, tầng, số người, ngày và giờ!",
      });
    }
    if (!Number.isInteger(Number(numberOfPeople)) || Number(numberOfPeople) <= 0) {
      return res.status(400).json({
        status: "ERR",
        message: "Số người phải là một số nguyên dương!",
      });
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        status: "ERR",
        message: "Ngày phải có định dạng YYYY-MM-DD!",
      });
    }
    if (meals && !Array.isArray(meals)) {
      return res.status(400).json({
        status: "ERR",
        message: "Danh sách món ăn phải là một mảng!",
      });
    }
    const userId = req.user.id;
    const response = await BookingService.bookingTable(
      { restaurant, floor, numberOfPeople: Number(numberOfPeople), note, date, time, meals },
      userId
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    console.log("Request body in controller:", req.body);
    const { floor, numberOfPeople, note, date, time, meals, status, paymentMethod, paymentStatus } = req.body; // Thêm paymentMethod và paymentStatus
    if (!bookingId) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp ID booking!",
      });
    }
    if (!floor || !numberOfPeople || !date || !time) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp đầy đủ thông tin: tầng, số người, ngày và giờ!",
      });
    }
    if (!Number.isInteger(Number(numberOfPeople)) || Number(numberOfPeople) <= 0) {
      return res.status(400).json({
        status: "ERR",
        message: "Số người phải là một số nguyên dương!",
      });
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        status: "ERR",
        message: "Ngày phải có định dạng YYYY-MM-DD!",
      });
    }
    if (meals && !Array.isArray(meals)) {
      return res.status(400).json({
        status: "ERR",
        message: "Danh sách món ăn phải là một mảng!",
      });
    }
    // Validation cho status
    const validStatuses = ["chờ xử lý", "đã xác nhận", "đã hủy"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        status: "ERR",
        message: `Trạng thái không hợp lệ! Trạng thái phải là một trong: ${validStatuses.join(", ")}`,
      });
    }
    // Validation cho paymentMethod
    const validPaymentMethods = ["tiền mặt", "chuyển khoản"];
    if (paymentMethod && !validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        status: "ERR",
        message: `Phương thức thanh toán không hợp lệ! Phương thức phải là một trong: ${validPaymentMethods.join(", ")}`,
      });
    }
    // Validation cho paymentStatus
    const validPaymentStatuses = ["chờ xử lý", "đã thanh toán"];
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        status: "ERR",
        message: `Trạng thái thanh toán không hợp lệ! Trạng thái phải là một trong: ${validPaymentStatuses.join(", ")}`,
      });
    }
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const response = await BookingService.updateBooking(
      bookingId,
      { floor, numberOfPeople: Number(numberOfPeople), note, date, time, meals, status, paymentMethod, paymentStatus }, // Thêm paymentMethod và paymentStatus
      userId,
      isAdmin
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const cancleBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if (!bookingId) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp ID booking!",
      });
    }

    const response = await BookingService.cancleBooking(bookingId, userId, isAdmin);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if (!bookingId) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp ID booking!",
      });
    }

    const response = await BookingService.getBooking(bookingId, userId, isAdmin);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await BookingService.getMyBookings(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const response = await BookingService.getAll(userId, isAdmin);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const updateMeals = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { meals, totalPrice } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp ID booking!",
      });
    }

    if (!meals || !Array.isArray(meals)) {
      return res.status(400).json({
        status: "ERR",
        message: "Danh sách món ăn phải là một mảng!",
      });
    }

    if (typeof totalPrice !== "number" || totalPrice < 0) {
      return res.status(400).json({
        status: "ERR",
        message: "Tổng giá phải là một số không âm!",
      });
    }

    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const response = await BookingService.updateMeals(bookingId, { meals, totalPrice }, userId, isAdmin);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy id bàn đặt!",
      });
    }
    const response = await BookingService.deleteBooking(bookingId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
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