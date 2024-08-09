const express = require("express");

const router = express.Router();

const problemController = require("../controllers/problemController");

router.get("/hello", problemController.hello);

module.exports = router;
