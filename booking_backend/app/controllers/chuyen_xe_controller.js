const ChuyenXeService = require("../services/chuyen_xe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createChuyenXe = async (req, res, next) => {
  try {
    if (!req.body.tenchuyenxe) {
      return next(new ApiError(400, "Tên chuyến xe không được rỗng"));
    }

    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const chuyenXe = await chuyenXeService.createChuyenXe(req.body);
    return res.status(201).json(chuyenXe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo chuyến xe"));
  }
};

exports.getChuyenXe = async (req, res, next) => {
  try {
    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const chuyenXe = await chuyenXeService.findChuyenXe({});
    return res.status(200).json(chuyenXe);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất chuyến xe")
    );
  }
};

exports.getChuyenXeById = async (req, res, next) => {
  try {
    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const chuyenXe = await chuyenXeService.findChuyenXeById(req.params.id);
    if (!chuyenXe) {
      return next(new ApiError(404, "Chuyến xe không tìm thấy"));
    }
    return res.status(200).json(chuyenXe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất chuyến xe với id= ${req.params.id}`)
    );
  }
};

exports.updateChuyenXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const chuyenXe = await chuyenXeService.updateChuyenXe(
      req.params.id,
      req.body
    );
    if (!chuyenXe) {
      return next(new ApiError(404, "Chuyến xe không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Chuyến xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật chuyến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteChuyenXe = async (req, res, next) => {
  try {
    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const chuyenXe = await chuyenXeService.deleteChuyenXe(req.params.id);
    if (!chuyenXe) {
      return next(new ApiError(404, "Chuyến xe không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Chuyến xe đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa chuyến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteAllChuyenXe = async (req, res, next) => {
  try {
    const chuyenXeService = new ChuyenXeService(MongoDB.client);
    const deleteCount = await chuyenXeService.deleteAllChuyenXe();
    return res.send({
      message: `${deleteCount} chuyến xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các chuyến xe")
    );
  }
};
