const express = require("express");
const router = express.Router();
const chuyenXeController = require("../controllers/chuyen_xe_controller");

router
  .route("/")
  .post(chuyenXeController.createChuyenXe)
  .get(chuyenXeController.getChuyenXe)
  .delete(chuyenXeController.deleteAllChuyenXe);

router
  .route("/:id")
  .get(chuyenXeController.getChuyenXeById)
  .put(chuyenXeController.updateChuyenXe)
  .delete(chuyenXeController.deleteChuyenXe);

module.exports = router;
