const sharp = require("sharp");
const MealService = require("../services/MealService");
const JwtService = require("../services/jwtService");

const createMeal = async (req, res) => {
  try {
    const { name, image, type, price, description } = req.body;
        if (!name || !image || !type || !price) {
      return res.status(200).json({
        status: "ERR",
        message: "Yêu cầu nhập đầy đủ thông tin món ăn!",
      });
    }
    
    // Decode Base64 và nén ảnh bằng sharp
    const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

    const optimizedImageBuffer = await sharp(imageBuffer)
      .resize(800) // Thay đổi kích thước ảnh (800px chiều rộng, tự động giữ tỷ lệ)
      .jpeg({ quality: 80 }) // Nén ảnh với chất lượng 80%
      .toBuffer();

    // Chuyển ảnh đã nén thành Base64
    const optimizedImageBase64 = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

    // Lưu thông tin món ăn vào MongoDB
    const response = await MealService.createMeal({
      name,
      image: optimizedImageBase64, // Lưu Base64 đã nén
      type,
      price,
      description,
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const updateMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    const data = req.body;
    if (!mealId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy món ăn",
      });
    }
    const response = await MealService.updateMeal(mealId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    if (!mealId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy món ăn",
      });
    }
    const response = await MealService.deleteMeal(mealId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    if (!mealId) {
      return res.status(200).json({
        status: "ERR",
        message: "Không tìm thấy món ăn",
      });
    }
    const response = await MealService.getMeal(mealId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await MealService.getAll(
      Number(limit) || 8,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createMeal,
  updateMeal,
  deleteMeal,
  getMeal,
  getAll,
};
