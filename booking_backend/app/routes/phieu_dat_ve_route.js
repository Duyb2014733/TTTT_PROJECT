const express = require("express");
const router = express.Router();
const phieuDatVeController = require("../controllers/phieu_dat_ve_controller");

router
  .route("/")
  .post(phieuDatVeController.createPhieuDatVe)
  .get(phieuDatVeController.getPhieuDatVe)
  .delete(phieuDatVeController.deleteAllPhieuDatVe);

router
  .route("/:id")
  .get(phieuDatVeController.getPhieuDatVeById)
  .put(phieuDatVeController.updatePhieuDatVe)
  .delete(phieuDatVeController.deletePhieuDatVe);

module.exports = router;
