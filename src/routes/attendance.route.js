const express = require("express");
const attendanceController = require("../controllers/attendance.controller");
const router = express.Router();

router.get("/", attendanceController.getAttendances);
router.get("/:id", attendanceController.getAttendance);
router.post("/", attendanceController.createAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
