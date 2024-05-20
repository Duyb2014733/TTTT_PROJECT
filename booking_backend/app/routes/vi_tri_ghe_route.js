const express = require("express");
const router = express.Router();
const viTriGheController = require("../controllers/vi_tri_ghe_controller");

router
  .route("/")
  .post(viTriGheController.createViTriGhe)
  .get(viTriGheController.getViTriGhe)
  .delete(viTriGheController.deleteAllViTriGhe);

router
  .route("/:id")
  .get(viTriGheController.getViTriGheById)
  .put(viTriGheController.updateViTriGhe)
  .delete(viTriGheController.deleteViTriGhe);

module.exports = router;
