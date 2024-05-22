const TinhThanhService = require("../services/tinh_thanh_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createTinhThanh = async (req, res, next) => {
  try {
    if (!req.body.tentinh) {
      return next(new ApiError(400, "Tên tỉnh không được rỗng"));
    }

    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const tinhThanh = await tinhThanhService.createTinhThanh(req.body);
    return res.status(201).json(tinhThanh);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo tỉnh thành"));
  }
};

exports.getTinhThanh = async (req, res, next) => {
  try {
    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const tinhThanh = await tinhThanhService.findTinhThanh({});
    return res.status(200).json(tinhThanh);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất tỉnh thành")
    );
  }
};

exports.getTinhThanhById = async (req, res, next) => {
  try {
    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const tinhThanh = await tinhThanhService.findTinhThanhById(req.params.id);
    if (!tinhThanh) {
      return next(new ApiError(404, "Tỉnh thành không tìm thấy"));
    }
    return res.status(200).json(tinhThanh);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất tỉnh thành với id= ${req.params.id}`)
    );
  }
};

exports.updateTinhThanh = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const tinhThanh = await tinhThanhService.updateTinhThanh(
      req.params.id,
      req.body
    );
    if (!tinhThanh) {
      return next(new ApiError(404, "Tỉnh thành không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Tỉnh thành đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật tỉnh thành với id=${req.params.id}`)
    );
  }
};

exports.deleteTinhThanh = async (req, res, next) => {
  try {
    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const tinhThanh = await tinhThanhService.deleteTinhThanh(req.params.id);
    if (!tinhThanh) {
      return next(new ApiError(404, "Tỉnh thành không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Tỉnh thành đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa tỉnh thành với id=${req.params.id}`)
    );
  }
};

exports.deleteAllTinhThanh = async (req, res, next) => {
  try {
    const tinhThanhService = new TinhThanhService(MongoDB.client);
    const deleteCount = await tinhThanhService.deleteAllTinhThanh();
    return res.send({
      message: `${deleteCount} tỉnh thành đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các tỉnh thành")
    );
  }
};
