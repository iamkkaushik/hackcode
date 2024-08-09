/* eslint-disable import/no-extraneous-dependencies */
// const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const problemRouter = require("./routes/problemRoutes");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. Please try again later.",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());
app.use(compression());

// Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/problems", problemRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.url} on the server.`, 404);
  next(err);
});

module.exports = app;
