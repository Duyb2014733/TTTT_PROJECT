const express = require("express");
const router = express.Router();
const xeController = require("../controllers/xe_controller");

router
  .route("/")
  .post(xeController.createXe)
  .get(xeController.getXe)
  .delete(xeController.deleteAllXe);

router
  .route("/:id")
  .get(xeController.getXeById)
  .put(xeController.updateXe)
  .delete(xeController.deleteXe);

module.exports = router;
