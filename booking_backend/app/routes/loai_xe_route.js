const express = require("express");
const router = express.Router();
const loaiXeController = require("../controllers/loai_xe_controller");

router
  .route("/")
  .post(loaiXeController.createLoaiXe)
  .get(loaiXeController.getLoaiXe)
  .delete(loaiXeController.deleteAllLoaiXe);

router
  .route("/:id")
  .get(loaiXeController.getLoaiXeById)
  .put(loaiXeController.updateLoaiXe)
  .delete(loaiXeController.deleteLoaiXe);

module.exports = router;
