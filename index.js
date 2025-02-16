const express = require("express");
const colors = require("colors");
const morgan = require("morgan"); // Corrected the typo here
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoute');
const adminRoutes = require("./routes/adminRoute");
const doctorRoutes = require("./routes/doctorRoute");
const connectDb = require("./config/connectDb");
const path = require("path");
// Add CORS handling for production
const cors = require('cors');


app.use(cors());
// dotenv config
dotenv.config();
connectDb();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(morgan("dev")); // HTTP request logger

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

// Serve static files in production
app.use(express.static(path.join(__dirname, "./client/build")));

// Handle all routes to serve the React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port Configuration
const PORT = process.env.PORT || 4001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.green.bold);
});



// Update MongoDB connection
// Make sure your DB_URL in .env is the production MongoDB URL
