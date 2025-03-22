const express = require("express");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const path = require("path");

// Load environment variables
dotenv.config();

const serviceAccount = require("./config/service-account.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Root route redirects to login
app.get("/", (req, res) => res.redirect("/auth/login"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
