const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.post("/request-otp", controller.requestOtp);
router.post("/verify-otp", controller.verifyOtp);
router.get("/", controller.getStudents);
router.get("/:id", controller.getStudent);
router.post("/", controller.createStudent);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
