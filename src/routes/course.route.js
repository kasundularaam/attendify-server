const express = require("express");
const router = express.Router();
const controller = require("../controllers/course.controller");

router.get("/", controller.getCourses);
router.get("/:id", controller.getCourse);
router.post("/", controller.createCourse);
router.put("/:id", controller.updateCourse);
router.delete("/:id", controller.deleteCourse);

module.exports = router;
