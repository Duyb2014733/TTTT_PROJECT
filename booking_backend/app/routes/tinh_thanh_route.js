const express = require("express");
const router = express.Router();
const tinhThanhController = require("../controllers/tinh_thanh_controller");

router
  .route("/")
  .post(tinhThanhController.createTinhThanh)
  .get(tinhThanhController.getTinhThanh)
  .delete(tinhThanhController.deleteAllTinhThanh);

router
  .route("/:id")
  .get(tinhThanhController.getTinhThanhById)
  .put(tinhThanhController.updateTinhThanh)
  .delete(tinhThanhController.deleteTinhThanh);

module.exports = router;
