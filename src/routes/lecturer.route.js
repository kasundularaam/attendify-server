const express = require("express");
const router = express.Router();
const controller = require("../controllers/lecturer.controller");

router.post("/request-otp", controller.requestOtp);
router.post("/verify-otp", controller.verifyOtp);
router.get("/", controller.getLecturers);
router.get("/:id", controller.getLecturer);
router.post("/", controller.createLecturer);
router.put("/:id", controller.updateLecturer);
router.delete("/:id", controller.deleteLecturer);

module.exports = router;
