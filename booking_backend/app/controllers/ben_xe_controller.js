const BenXeService = require("../services/ben_xe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createBenXe = async (req, res, next) => {
  try {
    if (!req.body.tenben) {
      return next(new ApiError(400, "Tên bến không được rỗng"));
    }

    const benXeService = new BenXeService(MongoDB.client);
    const benXe = await benXeService.createBenXe(req.body);
    return res.status(201).json(benXe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo bến xe"));
  }
};

exports.getBenXe = async (req, res, next) => {
  try {
    const benXeService = new BenXeService(MongoDB.client);
    const benXe = await benXeService.findBenXe({});
    return res.status(200).json(benXe);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất bến xe"));
  }
};

exports.getBenXeById = async (req, res, next) => {
  try {
    const benXeService = new BenXeService(MongoDB.client);
    const benXe = await benXeService.findBenXeById(req.params.id);
    if (!benXe) {
      return next(new ApiError(404, "Bến xe không tìm thấy"));
    }
    return res.status(200).json(benXe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất bến xe với id= ${req.params.id}`)
    );
  }
};

exports.updateBenXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const benXeService = new BenXeService(MongoDB.client);
    const benXe = await benXeService.updateBenXe(req.params.id, req.body);
    if (!benXe) {
      return next(new ApiError(404, "Bến xe không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Bến xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật bến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteBenXe = async (req, res, next) => {
  try {
    const benXeService = new BenXeService(MongoDB.client);
    const benXe = await benXeService.deleteBenXe(req.params.id);
    if (!benXe) {
      return next(new ApiError(404, "Bến xe không tìm thấy"));
    }
    return res.status(204).json({ message: "Bến xe đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa bến xe với id=${req.params.id}`)
    );
  }
};

exports.deleteAllBenXe = async (req, res, next) => {
  try {
    const benXeService = new BenXeService(MongoDB.client);
    const deleteCount = await benXeService.deleteAllBenXe();
    return res.send({
      message: `${deleteCount} bến xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các bến xe")
    );
  }
};
