const ViTriGheService = require("../services/vi_tri_ghe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createViTriGhe = async (req, res, next) => {
  try {
    if (!req.body.tenvitri) {
      return next(new ApiError(400, "Tên vị trí không được rỗng"));
    }

    const viTriGheService = new ViTriGheService(MongoDB.client);
    const viTriGhe = await viTriGheService.createViTriGhe(req.body);
    return res.status(201).json(viTriGhe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo vị trí ghế"));
  }
};

exports.getViTriGhe = async (req, res, next) => {
  try {
    const viTriGheService = new ViTriGheService(MongoDB.client);
    const viTriGhe = await viTriGheService.findViTriGhe({});
    return res.status(200).json(viTriGhe);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất vị trí ghế")
    );
  }
};

exports.getViTriGheById = async (req, res, next) => {
  try {
    const viTriGheService = new ViTriGheService(MongoDB.client);
    const viTriGhe = await viTriGheService.findViTriGheById(req.params.id);
    if (!viTriGhe) {
      return next(new ApiError(404, "Vị trí ghế không tìm thấy"));
    }
    return res.status(200).json(viTriGhe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất vị trí ghế với id= ${req.params.id}`)
    );
  }
};

exports.updateViTriGhe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const viTriGheService = new ViTriGheService(MongoDB.client);
    const viTriGhe = await viTriGheService.updateViTriGhe(
      req.params.id,
      req.body
    );
    if (!viTriGhe) {
      return next(new ApiError(404, "Vị trí ghế không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Vị trí ghế đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật vị trí ghế với id=${req.params.id}`)
    );
  }
};

exports.deleteViTriGhe = async (req, res, next) => {
  try {
    const viTriGheService = new ViTriGheService(MongoDB.client);
    const viTriGhe = await viTriGheService.deleteViTriGhe(req.params.id);
    if (!viTriGhe) {
      return next(new ApiError(404, "Vị trí ghế không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Vị trí ghế đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa vị trí ghế với id=${req.params.id}`)
    );
  }
};

exports.deleteAllViTriGhe = async (req, res, next) => {
  try {
    const viTriGheService = new ViTriGheService(MongoDB.client);
    const deleteCount = await viTriGheService.deleteAllViTriGhe();
    return res.send({
      message: `${deleteCount} loại xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các loại xe")
    );
  }
};
