const VeXeService = require("../services/ve_xe_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createVeXe = async (req, res, next) => {
  try {
    if (!req.body.tenvexe) {
      return next(new ApiError(400, "Tên vé xe không được rỗng"));
    }

    const veXeService = new VeXeService(MongoDB.client);
    const veXe = await veXeService.createVeXe(req.body);
    return res.status(201).json(veXe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo vé xe"));
  }
};

exports.getVeXe = async (req, res, next) => {
  try {
    const veXeService = new VeXeService(MongoDB.client);
    const veXe = await veXeService.findVeXe({});
    return res.status(200).json(veXe);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất vé xe"));
  }
};

exports.getVeXeById = async (req, res, next) => {
  try {
    const veXeService = new VeXeService(MongoDB.client);
    const veXe = await veXeService.findVeXeById(req.params.id);
    if (!veXe) {
      return next(new ApiError(404, "Vé xe không tìm thấy"));
    }
    return res.status(200).json(veXe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất vé xe với id= ${req.params.id}`)
    );
  }
};

exports.updateVeXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const veXeService = new VeXeService(MongoDB.client);
    const veXe = await veXeService.updateVeXe(req.params.id, req.body);
    if (!veXe) {
      return next(new ApiError(404, "Vé xe không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Vé xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật vé xe với id=${req.params.id}`)
    );
  }
};

exports.deleteVeXe = async (req, res, next) => {
  try {
    const veXeService = new VeXeService(MongoDB.client);
    const veXe = await veXeService.deleteVeXe(req.params.id);
    if (!veXe) {
      return next(new ApiError(404, "Vé xe không tìm thấy"));
    }
    return res.status(204).json({ message: "Vé xe đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa vé xe với id=${req.params.id}`)
    );
  }
};

exports.deleteAllVeXe = async (req, res, next) => {
  try {
    const veXeService = new VeXeService(MongoDB.client);
    const deleteCount = await veXeService.deleteAllVeXe();
    return res.send({
      message: `${deleteCount} vé xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các vé xe"));
  }
};
