const express = require("express");
const router = express.Router();
const veXeController = require("../controllers/ve_xe_controller");

router
  .route("/")
  .post(veXeController.createVeXe)
  .get(veXeController.getVeXe)
  .delete(veXeController.deleteAllVeXe);

router
  .route("/:id")
  .get(veXeController.getVeXeById)
  .put(veXeController.updateVeXe)
  .delete(veXeController.deleteVeXe);

module.exports = router;
