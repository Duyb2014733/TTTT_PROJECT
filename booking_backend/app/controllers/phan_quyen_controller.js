const PhanQuyenService = require("../services/phan_quyen_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createPhanQuyen = async (req, res, next) => {
  try {
    if (!req.body.phanquyen) {
      return next(new ApiError(400, "Phân quyền không được rỗng"));
    }

    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const phanQuyen = await phanQuyenService.createPhanQuyen(req.body);
    return res.status(201).json(phanQuyen);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo phân quyền"));
  }
};

exports.getPhanQuyen = async (req, res, next) => {
  try {
    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const phanQuyen = await phanQuyenService.findPhanQuyen({});
    return res.status(200).json(phanQuyen);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất phân quyền")
    );
  }
};

exports.getPhanQuyenById = async (req, res, next) => {
  try {
    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const phanQuyen = await phanQuyenService.findPhanQuyenById(req.params.id);
    if (!phanQuyen) {
      return next(new ApiError(404, "Phân quyền không tìm thấy"));
    }
    return res.status(200).json(phanQuyen);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất phân quyền với id= ${req.params.id}`)
    );
  }
};

exports.updatePhanQuyen = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const phanQuyen = await phanQuyenService.updatePhanQuyen(
      req.params.id,
      req.body
    );
    if (!phanQuyen) {
      return next(new ApiError(404, "Phân quyền không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Phân quyền đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật phân quyền với id=${req.params.id}`)
    );
  }
};

exports.deletePhanQuyen = async (req, res, next) => {
  try {
    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const phanQuyen = await phanQuyenService.deletePhanQuyen(req.params.id);
    if (!phanQuyen) {
      return next(new ApiError(404, "Phân quyền không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Phân quyền đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa phân quyền với id=${req.params.id}`)
    );
  }
};

exports.deleteAllPhanQuyen = async (req, res, next) => {
  try {
    const phanQuyenService = new PhanQuyenService(MongoDB.client);
    const deleteCount = await phanQuyenService.deleteAllPhanQuyen();
    return res.send({
      message: `${deleteCount} phân quyền đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các phân quyền")
    );
  }
};
