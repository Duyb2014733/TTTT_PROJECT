const express = require("express");
const cors = require("cors");
const LoaiXeRouter = require("./app/routes/loai_xe_route");
const XeRouter = require("./app/routes/xe_route");
const ViTriGheRouter = require("./app/routes/vi_tri_ghe_route");
const VeXeRouter = require("./app/routes/ve_xe_route");
const ChuyenXeRouter = require("./app/routes/chuyen_xe_route");
const PhieuDatVeRouter = require("./app/routes/phieu_dat_ve_route");
const NguoiDungRouter = require("./app/routes/nguoi_dung_route");
const PhanQuyenRouter = require("./app/routes/phan_quyen_route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Chào mừng bạn đến để kết nối ứng dụng đặt vé." });
});

app.use("/api/loaixe/", LoaiXeRouter);
app.use("/api/xe/", XeRouter);
app.use("/api/vitrighe/", ViTriGheRouter);
app.use("/api/vexe/", VeXeRouter);
app.use("/api/chuyenxe/", ChuyenXeRouter);
app.use("/api/phieudatve/", PhieuDatVeRouter);
app.use("/api/nguoidung/", NguoiDungRouter);
app.use("/api/phanquyen/", PhanQuyenRouter);

app.use((req, res, next) => {
  return next(new ApiError(404, "Không tìm thấy tài nguyên"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Lỗi máy chủ nội bộ",
  });
});

module.exports = app;
