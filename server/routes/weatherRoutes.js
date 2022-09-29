const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.homepage);
router.post("/", weatherController.city);


module.exports = router;