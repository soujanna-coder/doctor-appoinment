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

  // Handle the rejection of the promise.
  try {
    const appointmentDetails = await Appointment.findAll();
    console.log("appointmentDetails", appointmentDetails);
    res.render("appointment", {
      appointments: appointmentDetails,
      appointmentNumber: 1,
    });
  } catch (error) {
    console.log("Error:", error);
    res.render("appointment", {
      appointments: null,
      appointmentNumber: 0,
    });
  }
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

// get doctor list

const Doctor = db.doctor;
const DoctorType = db.doctorAppointment;
const DoctorAppointment = db.doctorType;

app.get("/doctor-list", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [DoctorType, DoctorAppointment],
    });
    const doctorTypes = await DoctorType.findAll();
    res.render("doctorList", { doctorList: doctors, doctorTypes: doctorTypes });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/add-doctor", async (req, res) => {
  try {
    const doctorTypes = await DoctorType.findAll();
    res.render("addDoctor", { doctorTypes: doctorTypes });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/add-doctor", async (req, res) => {
  try {
    // Create the doctor
    const doctor = await Doctor.create({
      name: req.body.name,
      type_name: req.body.type_name,
      type_id: req.body.type_id,
      details1: req.body.details1,
      details2: req.body.details2,
      details3: req.body.details3,
      appointment_time: req.body.appointment_time,
      appointment_fees: req.body.appointment_fees,
      appointment_venue: req.body.appointment_venue,
      mobile_number: req.body.mobile_number,
    });

    // Create appointments for the doctor
    const appointmentDates = req.body.appointment_dates;
    if (appointmentDates && Array.isArray(appointmentDates)) {
      await Promise.all(
        appointmentDates.map(async (date) => {
          await DoctorAppointment.create({
            doctor_id: doctor.doctor_id,
            appointment_date: date,
          });
        })
      );
    }

    res.redirect("/doctor-list");
  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).send("Internal Server Error");
  }
});
// workshop list
app.get("/workshop-list", async (req, res) => {
  const Workshop = db.workshop;
  try {
    const workshop = await Workshop.findAll();

    res.render("workshops", {
      Workshops: workshop,
      workshopNumber: 1,
    });
  } catch (error) {
    res.render("workshops", {
      Workshops: null,
      workshopNumber: 1,
    });
  }
});

//doctor List

app.get("/doctor-type-list", async (req, res) => {
  const DoctorType = db.doctorType;
  try {
    const doctorType = await DoctorType.findAll();

    res.render("doctorType", {
      DoctorTypes: doctorType,
      doctorTypeNumber: 1,
    });
  } catch (error) {
    res.render("doctorType", {
      DoctorTypes: 0,
      doctorTypeNumber: 1,
    });
  }
});
// book type

app.get("/book-type-list", async (req, res) => {
  const BookingType = db.bookingType;
  try {
    const bookingType = await BookingType.findAll();

    res.render("BookType", {
      BookingTypes: bookingType,
      bookingTypeNumber: 1,
    });
  } catch (error) {
    res.render("BookType", {
      BookingTypes: 0,
      bookingTypeNumber: 1,
    });
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = "public/uploads";
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
  try {
    if (!req.file) {
      return res.json({
        status: 400,
        message: "No file uploaded",
      });
    }
    // Get the file path of the uploaded file
    const filePath = path
      .join("http://43.205.35.147:8080/uploads", req.file.filename)
      .replace(/\\/g, "/");
    console.log(filePath);
    res.json({
      status: 200,
      message: "File uploaded successfully",
      data: filePath,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    return res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// Set up a route to handle file upload
