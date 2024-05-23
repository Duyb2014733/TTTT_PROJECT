const XeService = require("../services/xe_service");
const ApiError = require("../api-error");

exports.createXe = async (req, res, next) => {
  try {
    if (!req.body.bienso) {
      return next(new ApiError(400, "Biển số không được rỗng"));
    }

    const xeService = new XeService();
    const xe = await xeService.createXe(req.body);
    return res.status(201).json(xe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo xe"));
  }
};

exports.getXe = async (req, res, next) => {
  try {
    const xeService = new XeService();
    const loaiXe = await xeService.findXe({});
    return res.status(200).json(loaiXe);
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất xe"));
  }
};

exports.getXeById = async (req, res, next) => {
  try {
    const xeService = new XeService();
    const xe = await xeService.findXeById(req.params.id);
    if (!xe) {
      return next(new ApiError(404, "Xe không tìm thấy"));
    }
    return res.status(200).json(xe);
  } catch (error) {
    return next(new ApiError(500, `Lỗi truy xuất xe với id= ${req.params.id}`));
  }
};

exports.updateXe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const xeService = new XeService();
    const xe = await xeService.updateXe(req.params.id, req.body);
    if (!xe) {
      return next(new ApiError(404, "Xe không tìm thấy"));
    }
    return res.status(200).json({ message: "Xe đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật xe với id=${req.params.id}`)
    );
  }
};

exports.deleteXe = async (req, res, next) => {
  try {
    const xeService = new XeService();
    const xe = await xeService.deleteXe(req.params.id);
    if (!xe) {
      return next(new ApiError(404, "Xe không tìm thấy"));
    }
    return res.status(204).json({ message: "Xe đã được xóa thành công" });
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa xe với id=${req.params.id}`));
  }
};

exports.deleteAllXe = async (req, res, next) => {
  try {
    const xeService = new XeService();
    const deleteCount = await xeService.deleteAllXe();
    return res.send({
      message: `${deleteCount} xe đã bị xóa thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các xe"));
  }
};
