const QuanHuyenService = require("../services/quan_huyen_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createQuanHuyen = async (req, res, next) => {
  try {
    if (!req.body.tenquanhuyen) {
      return next(new ApiError(400, "Tên quận huyện không được rỗng"));
    }

    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const quanHuyen = await quanHuyenService.createQuanHuyen(req.body);
    return res.status(201).json(quanHuyen);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo quận huyện"));
  }
};

exports.getQuanHuyen = async (req, res, next) => {
  try {
    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const quanHuyen = await quanHuyenService.findQuanHuyen({});
    return res.status(200).json(quanHuyen);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất quận huyện")
    );
  }
};

exports.getQuanHuyenById = async (req, res, next) => {
  try {
    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const quanHuyen = await quanHuyenService.findQuanHuyenById(req.params.id);
    if (!quanHuyen) {
      return next(new ApiError(404, "Quận huyện không tìm thấy"));
    }
    return res.status(200).json(quanHuyen);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất quận huyện với id= ${req.params.id}`)
    );
  }
};

exports.updateQuanHuyen = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const quanHuyen = await quanHuyenService.updateQuanHuyen(
      req.params.id,
      req.body
    );
    if (!quanHuyen) {
      return next(new ApiError(404, "Quận huyện không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Quận huyện đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật quận huyện với id=${req.params.id}`)
    );
  }
};

exports.deleteQuanHuyen = async (req, res, next) => {
  try {
    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const quanHuyen = await quanHuyenService.deleteQuanHuyen(req.params.id);
    if (!quanHuyen) {
      return next(new ApiError(404, "Quận huyện không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Quận huyện đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa quận huyện với id=${req.params.id}`)
    );
  }
};

exports.deleteAllQuanHuyen = async (req, res, next) => {
  try {
    const quanHuyenService = new QuanHuyenService(MongoDB.client);
    const deleteCount = await quanHuyenService.deleteAllQuanHuyen();
    return res.send({
      message: `${deleteCount} quận huyện đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các quận huyện")
    );
  }
};
