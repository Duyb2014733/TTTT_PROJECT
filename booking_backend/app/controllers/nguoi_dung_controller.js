const NguoiDungService = require("../services/nguoi_dung_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createNguoiDung = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return next(new ApiError(400, "Email không được rỗng"));
    }

    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const nguoiDung = await nguoiDungService.createNguoiDung(req.body);
    return res.status(201).json(nguoiDung);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo người dùng"));
  }
};

exports.getNguoiDung = async (req, res, next) => {
  try {
    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const nguoiDung = await nguoiDungService.findNguoiDung({});
    return res.status(200).json(nguoiDung);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất người dùng")
    );
  }
};

exports.getNguoiDungById = async (req, res, next) => {
  try {
    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const nguoiDung = await nguoiDungService.findNguoiDungById(req.params.id);
    if (!nguoiDung) {
      return next(new ApiError(404, "Người dùng không tìm thấy"));
    }
    return res.status(200).json(nguoiDung);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất người dùng với id= ${req.params.id}`)
    );
  }
};

exports.updateNguoiDung = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const nguoiDung = await nguoiDungService.updateNguoiDung(
      req.params.id,
      req.body
    );
    if (!nguoiDung) {
      return next(new ApiError(404, "Người dùng không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "người dùng đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật người dùng với id=${req.params.id}`)
    );
  }
};

exports.deleteNguoiDung = async (req, res, next) => {
  try {
    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const nguoiDung = await nguoiDungService.deleteNguoiDung(req.params.id);
    if (!nguoiDung) {
      return next(new ApiError(404, "Người dùng không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Người dùng đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa người dùng với id=${req.params.id}`)
    );
  }
};

exports.deleteAllNguoiDung = async (req, res, next) => {
  try {
    const nguoiDungService = new NguoiDungService(MongoDB.client);
    const deleteCount = await nguoiDungService.deleteAllNguoiDung();
    return res.send({
      message: `${deleteCount} người dùng đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các người dùng")
    );
  }
};
