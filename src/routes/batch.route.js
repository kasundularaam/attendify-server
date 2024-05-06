const express = require("express");
const batchController = require("../controllers/batch.controller");
const router = express.Router();

router.get("/", batchController.getBatches);
router.get("/:id", batchController.getBatch);
router.post("/", batchController.createBatch);
router.put("/:id", batchController.updateBatch);
router.delete("/:id", batchController.deleteBatch);

module.exports = router;
