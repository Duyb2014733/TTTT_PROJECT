const express = require("express");
const router = express.Router();
const phanQuyenController = require("../controllers/phan_quyen_controller");

router
  .route("/")
  .post(phanQuyenController.createPhanQuyen)
  .get(phanQuyenController.getPhanQuyen)
  .delete(phanQuyenController.deleteAllPhanQuyen);

router
  .route("/:id")
  .get(phanQuyenController.getPhanQuyenById)
  .put(phanQuyenController.updatePhanQuyen)
  .delete(phanQuyenController.deletePhanQuyen);

module.exports = router;
