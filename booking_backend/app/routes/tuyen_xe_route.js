const express = require("express");
const router = express.Router();
const tuyenXeController = require("../controllers/tuyen_xe_controller");

router
  .route("/")
  .post(tuyenXeController.createTuyenXe)
  .get(tuyenXeController.getTuyenXe)
  .delete(tuyenXeController.deleteAllTuyenXe);

router
  .route("/:id")
  .get(tuyenXeController.getTuyenXeById)
  .put(tuyenXeController.updateTuyenXe)
  .delete(tuyenXeController.deleteTuyenXe);

module.exports = router;
