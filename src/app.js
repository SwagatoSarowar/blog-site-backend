require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

// Routers
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/categoryRoutes");

//Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(cookieparser());
app.use(express.json());
app.use(express.static("public"));

//API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/categories", categoryRouter);

//API missing route handler
app.use("*", (req, res, next) => {
  next(new AppError(`Could not found ${req.originalUrl} in this server.`, 404));
});

// Global error controller
app.use(errorController);

module.exports = app;
