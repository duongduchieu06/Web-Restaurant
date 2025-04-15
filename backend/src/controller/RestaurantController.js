const RestaurantService = require("../services/RestaurantService");

const createRestaurant = async (req, res) => {
  try {
    const { name, numberOfFloor, timeAvailable } = req.body;

    if (!name || !numberOfFloor || !timeAvailable || !Array.isArray(timeAvailable)) {
      return res.status(400).json({
        status: "ERR",
        message: "Vui lòng cung cấp đầy đủ thông tin: tên, số tầng và danh sách thời gian khả dụng!",
      });
    }

    const response = await RestaurantService.createRestaurant({
      name,
      numberOfFloor,
      timeAvailable,
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, numberOfFloor, timeAvailable } = req.body;

    const response = await RestaurantService.updateRestaurant(id, {
      name,
      numberOfFloor,
      timeAvailable,
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await RestaurantService.deleteRestaurant(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await RestaurantService.getRestaurant(id);
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
    const response = await RestaurantService.getAllRestaurants();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message || "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  getAll,
};