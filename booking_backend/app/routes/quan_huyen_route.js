const express = require("express");
const router = express.Router();
const quanHuyenController = require("../controllers/quan_huyen_controller");

router
  .route("/")
  .post(quanHuyenController.createQuanHuyen)
  .get(quanHuyenController.getQuanHuyen)
  .delete(quanHuyenController.deleteAllQuanHuyen);

router
  .route("/:id")
  .get(quanHuyenController.getQuanHuyenById)
  .put(quanHuyenController.updateQuanHuyen)
  .delete(quanHuyenController.deleteQuanHuyen);

module.exports = router;
