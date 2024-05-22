const TuyenXeService = require("../services/tuyen_xe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createTuyenXe = async (req, res, next) => {
  try {
    if (!req.body.tentuyen) {
      return next(new ApiError(400, "Tên tuyến không được rỗng"));
    }

    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const tuyenXe = await tuyenXeService.createTuyenXe(req.body);
    return res.status(201).json(tuyenXe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo tuyến xe"));
  }
};

exports.getTuyenXe = async (req, res, next) => {
  try {
    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const tuyenXe = await tuyenXeService.findTuyenXe({});
    return res.status(200).json(tuyenXe);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất tuyến xe")
    );
  }
};

exports.getTuyenXeById = async (req, res, next) => {
  try {
    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const tuyenXe = await tuyenXeService.findTuyenXeById(req.params.id);
    if (!tuyenXe) {
      return next(new ApiError(404, "Tuyến xe không tìm thấy"));
    }
    return res.status(200).json(tuyenXe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất tuyến xe với id= ${req.params.id}`)
    );
  }
};

exports.updateTuyenXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const tuyenXe = await tuyenXeService.updateTuyenXe(req.params.id, req.body);
    if (!tuyenXe) {
      return next(new ApiError(404, "Tuyến xe không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Tuyến xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật tuyến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteTuyenXe = async (req, res, next) => {
  try {
    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const tuyenXe = await tuyenXeService.deleteTuyenXe(req.params.id);
    if (!tuyenXe) {
      return next(new ApiError(404, "Tuyến xe không tìm thấy"));
    }
    return res.status(204).json({ message: "Tuyến xe đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa tuyến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteAllTuyenXe = async (req, res, next) => {
  try {
    const tuyenXeService = new TuyenXeService(MongoDB.client);
    const deleteCount = await tuyenXeService.deleteAllTuyenXe();
    return res.send({
      message: `${deleteCount} tuyến xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các tuyến xe")
    );
  }
};
