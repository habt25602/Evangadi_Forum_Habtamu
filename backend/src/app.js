const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Import routes
const UserRoutes = require("./routes/userRoute");
const questionsRoutes = require("./routes/questionRoute");
const answersRoutes = require("./routes/answerRoute");

// Authorization middleware
const authMiddleware = require("./middleware/authMiddleware");

// Set up routes
app.use("/api/users", UserRoutes);
app.use("/api/questions", authMiddleware, questionsRoutes);
app.use("/api/answers", authMiddleware, answersRoutes);

module.exports = app;
