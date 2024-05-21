const express = require("express");
const router = express.Router();
const nguoiDungController = require("../controllers/nguoi_dung_controller");

router
  .route("/")
  .post(nguoiDungController.createNguoiDung)
  .get(nguoiDungController.getNguoiDung)
  .delete(nguoiDungController.deleteAllNguoiDung);

router
  .route("/:id")
  .get(nguoiDungController.getNguoiDungById)
  .put(nguoiDungController.updateNguoiDung)
  .delete(nguoiDungController.deleteNguoiDung);

module.exports = router;
