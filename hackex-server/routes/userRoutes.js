// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
router.get("/leaderboard", userController.getLeaderboard);
router.get("/profile", userController.getUserData);

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "uploads/profileImages");
    fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
    cb(null, dir); // Set destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Set filename
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  },
});

// Route to handle image upload
router.post(
  "/uploadProfileImage",
  upload.single("profileImage"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const profileImageUrl = `/uploads/profileImages/${req.file.filename}`;
    res.json({
      profileImageUrl: profileImageUrl,
      message: "Profile image uploaded successfully.",
    });
  },
);

module.exports = router;
