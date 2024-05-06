const express = require("express");
const router = express.Router();
const controller = require("../controllers/university.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", controller.getAll);
router.patch("/:id", controller.update);
router.get("/:id", controller.get);
router.delete("/:id", controller.remove);

module.exports = router;
