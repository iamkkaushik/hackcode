const express = require("express");

const router = express.Router();

const problemController = require("../controllers/problemController");

router.get("/hello", problemController.hello);
router.get("/allProblems", problemController.getAllProblems);
router.post("/addProblem", problemController.addProblem);
router.get("/getProblem/:id", problemController.getProblem);
module.exports = router;
