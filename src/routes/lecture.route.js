const express = require("express");
const router = express.Router();
const controller = require("../controllers/lecture.controller");

router.get("/", controller.getLectures);
router.get("/:id", controller.getLecture);
router.post("/", controller.createLecture);
router.put("/:id", controller.updateLecture);
router.delete("/:id", controller.deleteLecture);

module.exports = router;
