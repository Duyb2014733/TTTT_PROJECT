const LoaiXeService = require("../services/loai_xe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createLoaiXe = async (req, res, next) => {
  try {
    if (!req.body.tenloai) {
      return next(new ApiError(400, "Tên loại không được rỗng"));
    }

    const loaiXeService = new LoaiXeService(MongoDB.client);
    const loaiXe = await loaiXeService.createLoaiXe(req.body);
    return res.status(201).json(loaiXe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo loại xe"));
  }
};

exports.getLoaiXe = async (req, res, next) => {
  try {
    const loaiXeService = new LoaiXeService(MongoDB.client);
    const loaiXe = await loaiXeService.findLoaiXe({});
    return res.status(200).json(loaiXe);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất loại xe"));
  }
};

exports.getLoaiXeById = async (req, res, next) => {
  try {
    const loaiXeService = new LoaiXeService(MongoDB.client);
    const loaiXe = await loaiXeService.findLoaiXeById(req.params.id);
    if (!loaiXe) {
      return next(new ApiError(404, "Loại xe không tìm thấy"));
    }
    return res.status(200).json(loaiXe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất loại xe với id= ${req.params.id}`)
    );
  }
};

exports.updateLoaiXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const loaiXeService = new LoaiXeService(MongoDB.client);
    const loaiXe = await loaiXeService.updateLoaiXe(req.params.id, req.body);
    if (!loaiXe) {
      return next(new ApiError(404, "Loại xe không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Loại xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật loại xe với id=${req.params.id}`)
    );
  }
};

exports.deleteLoaiXe = async (req, res, next) => {
  try {
    const loaiXeService = new LoaiXeService(MongoDB.client);
    const loaiXe = await loaiXeService.deleteLoaiXe(req.params.id);
    if (!loaiXe) {
      return next(new ApiError(404, "Loại xe không tìm thấy"));
    }
    return res.status(204).json({ message: "Loại xe đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa loại xe với id=${req.params.id}`)
    );
  }
};

exports.deleteAllLoaiXe = async (req, res, next) => {
  try {
    const loaiXeService = new LoaiXeService(MongoDB.client);
    const deleteCount = await loaiXeService.deleteAllLoaiXe();
    return res.send({
      message: `${deleteCount} loại xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các loại xe")
    );
  }
};
