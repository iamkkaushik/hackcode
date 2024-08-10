const express = require("express");
const router = express.Router();

const contestController = require("../controllers/contestController");

router.post("/createContest", contestController.createContest);
router.get("/allContests", contestController.allContests);
router.get("/:id/problems", contestController.getContest);
module.exports = router;
