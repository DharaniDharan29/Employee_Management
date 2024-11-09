import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Emprouter from "./routes/routes.js";
import EmployeeData from "./model/employee.model.js";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { fileURLToPath } from "url";
import fs from "fs";
import leaveApplication from "./model/leaveApplication.js";
import boarding from "./model/boarding.js";
const app = express();
const PORT = process.env.PORT || 4242;

// Determine __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // add other HTTP methods if needed
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parsing middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Directory for uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
app.use("/uploads", express.static(uploadDir));

// MongoDB connection
const uri = process.env.MONGODB_URL;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

// Import routes
app.use("/Em", Emprouter);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending route
app.post("/api/send-email", (req, res) => {
  const { recipient, subject, text } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ success: false, error: error.message });
    }
    res.status(200).send({ success: true, message: "Email sent successfully!" });
  });
});

app.post("/api/leaves", async (req, res) => {

  try {
    const { employeeId, leaveType, startDate, endDate, reason, comments } = req.body;
    const LeaveApplication = new leaveApplication({
      employeeId,
      leaveType,
      startDate,
      endDate,
      reason,
      comments
    });
    await LeaveApplication.save();
    res.status(200).send({ success: true, message: "Leave added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating leave application" });
  }
});
app.post("/api/onboarding", async (req, res) => {
  try {
    const { name, position, department, email, phone, onboardingDate, offboardingDate } = req.body;
    const OnboardingOffboarding = new OnboardingOffboarding({
      name,
      position,
      department,
      email,
      phone,
      onboardingDate,
      offboardingDate
    });
    await OnboardingOffboarding.save();
    res.status(200).send({ success: true, message: "Employee onboarding/offboarding details added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating onboarding/offboarding record" });
  }
});


//api/leaves
// User creation route with file upload
app.post("/api/users", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNumber,
      address,
      role,
      experience,
      online,
      linkedInId,
      githubId,
    } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newUser = new EmployeeData({
      name,
      photo,
      email,
      mobileNumber,
      address,
      role,
      experience,
      online,
      linkedInId,
      githubId,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
