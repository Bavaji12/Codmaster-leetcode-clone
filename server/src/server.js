const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const executionRoutes = require("./routes/executionRoutes");
const problemRoutes = require("./routes/problemRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/execution", executionRoutes);
app.use("/api/problems", problemRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to CodeMaster API",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CodeMaster backend is healthy",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CodeMaster server running on http://localhost:${PORT}`);
});
