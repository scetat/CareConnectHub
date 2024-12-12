const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/eventRoutes");
const appointmentRoutes = require("./routes/appointments");
const homeRoute = require("./routes/home");
const caregiversRoute = require("./routes/caregiver");
const profileRoute = require("./routes/profile");
const Adminroutes = require("./routes/Adminroutes");
const Appointment = require("./routes/appointment");
const path = require("path");

const app = express();

const mongoUrl =
  "mongodb+srv://chiragcanada90:Range@cluster0.iou3qzc.mongodb.net/";

// Middleware to handle JSON requests
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    name: "careconnectsession",
    secret: "careconnectsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
    cookie: { secure: false, sameSite: "lax", httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
app.use(bodyParser.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url} with body:`, req.body);
  next();
});

// MongoDB connection
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoute);
app.use("/api", eventRoutes);
app.use("/api/home", homeRoute);

app.use("/api/caregiver", caregiversRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin/events", Adminroutes); 
app.use('/api/appointment', Appointment);

// Serve React app
app.use(express.static(path.join(__dirname, "client/build")));

// Fallback route to serve the React app for all other paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Default route
app.get("/", (req, res) => {
  res.send("CareConnectHub API is running");
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
