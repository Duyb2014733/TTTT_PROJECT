const express = require("express");
const router = express.Router();
const benXeController = require("../controllers/ben_xe_controller");

router
  .route("/")
  .post(benXeController.createBenXe)
  .get(benXeController.getBenXe)
  .delete(benXeController.deleteAllBenXe);

router
  .route("/:id")
  .get(benXeController.getBenXeById)
  .put(benXeController.updateBenXe)
  .delete(benXeController.deleteBenXe);

module.exports = router;
