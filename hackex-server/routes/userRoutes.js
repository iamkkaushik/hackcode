const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/hello", userController.hello);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/submitCode", userController.submitCode);
router.post("/userProblems", userController.userProblems);
module.exports = router;
