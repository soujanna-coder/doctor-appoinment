const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const multer = require("multer");
const fs = require("fs"); // Import the fs module
app.set("view engine", "ejs");
const db = require("./models");
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(express.static(path.join(__dirname, "public")));

// Set up the view engine
app.set("views", path.join(__dirname, "views"));
// global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("corsOptions.origin" + corsOptions);
// user routers
const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

// status routers
const statusRouter = require("./routes/statusRouter");
app.use("/api/status", statusRouter);

// doctor-type routers
const doctortypeRouter = require("./routes/doctortypeRouter");
app.use("/api/doctor-type", doctortypeRouter);

//doctor
const doctorRouter = require("./routes/doctorRouter");
app.use("/api/doctor-type", doctorRouter);

// workshop
const workshopRouter = require("./routes/workshopRouter");
app.use("/api/workshop", workshopRouter);

//appointment
const appointmentRouter = require("./routes/appointmentRouter");
app.use("/api/appointment", appointmentRouter);

//doctor-appointment
const doctorAppointmentRouter = require("./routes/doctorAppointmentRouter");
app.use("/api/doctor-appointments", doctorAppointmentRouter);

//doctor-list
const doctorListRouter = require("./routes/doctorListRouter");
app.use("/api/doctor-list", doctorListRouter);

app.get("/", (req, res) => {
  res.render("login", { errorMessage: null });
});

app.get("/appointment", async (req, res) => {
  const Appointment = db.appointment;
  const appointmentDetails = await Appointment.findAll();
  console.log("appointmentDetails", appointmentDetails);
  res.render("appointment", {
    appointments: appointmentDetails,
    appointmentNumber: 1,
  });
});
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// admin login

// Handle login POST request
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Replace these with actual admin credentials
  const adminUsername = "admin@demo.com";
  const adminPassword = "123456";
  console.log(username, adminPassword);
  if (username === adminUsername && password === adminPassword) {
    // Redirect to the dashboard on successful login
    res.redirect("/appointment");
  } else {
    // Invalid credentials, show login page with error message
    res.render("login", { errorMessage: "Invalid username or password" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = "uploads";
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir); // Create the directory if it doesn't exist
    }
    cb(null, destinationDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const upload = multer({ storage: storage });

// Set up a route to handle file upload
app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  // Get the file path of the uploaded file
  const filePath = path.join("uploads", req.file.filename).replace(/\\/g, "/");
  console.log(filePath);
  res.json({ message: "File uploaded successfully", data: filePath });
});
// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Set up a route to handle file upload
