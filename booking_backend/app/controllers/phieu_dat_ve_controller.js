const PhieuDatVeService = require("../services/phieu_dat_ve_service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.createPhieuDatVe = async (req, res, next) => {
  try {
    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const phieuDatVe = await phieuDatVeService.createPhieuDatVe(req.body);
    return res.status(201).json(phieuDatVe);
  } catch (error) {
    return next(new ApiError(500, "Xảy ra lỗi trong khi tạo phiếu đặt vé"));
  }
};

exports.getPhieuDatVe = async (req, res, next) => {
  try {
    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const phieuDatVe = await phieuDatVeService.findPhieuDatVe({});
    return res.status(200).json(phieuDatVe);
  } catch (error) {
    return next(
      new ApiError(500, "Đã xảy ra lỗi trong khi truy xuất phiếu đặt vé")
    );
  }
};

exports.getPhieuDatVeById = async (req, res, next) => {
  try {
    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const phieuDatVe = await phieuDatVeService.findPhieuDatVeById(
      req.params.id
    );
    if (!phieuDatVe) {
      return next(new ApiError(404, "Phiếu đặt vé không tìm thấy"));
    }
    return res.status(200).json(phieuDatVe);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi truy xuất phiếu đặt vé với id= ${req.params.id}`)
    );
  }
};

exports.updatePhieuDatVe = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Dữ liệu để cập nhật không thể trống"));
    }

    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const phieuDatVe = await phieuDatVeService.updatePhieuDatVe(
      req.params.id,
      req.body
    );
    if (!phieuDatVe) {
      return next(new ApiError(404, "Phiếu đặt vé không tìm thấy"));
    }
    return res
      .status(200)
      .json({ message: "Phiếu đặt vé đã được cập nhật thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật phiếu đặt vé với id=${req.params.id}`)
    );
  }
};

exports.deletePhieuDatVe = async (req, res, next) => {
  try {
    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const phieuDatVe = await phieuDatVeService.deletePhieuDatVe(req.params.id);
    if (!phieuDatVe) {
      return next(new ApiError(404, "Phiếu đặt vé không tìm thấy"));
    }
    return res
      .status(204)
      .json({ message: "Phiếu đặt vé đã được xóa thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa phiếu đặt vé với id=${req.params.id}`)
    );
  }
};

exports.deleteAllPhieuDatVe = async (req, res, next) => {
  try {
    const phieuDatVeService = new PhieuDatVeService(MongoDB.client);
    const deleteCount = await phieuDatVeService.deleteAllPhieuDatVe();
    return res.send({
      message: `${deleteCount} phiếu đặt vé đã bị xóa thành công`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "Xảy ra lỗi trong khi xóa tất cả các phiếu đặt vé")
    );
  }
};
