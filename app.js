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
    const appointmentDetails = await Appointment.findAll({
      order: [["createdAt", "DESC"]],
    });
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

const DoctorType = db.doctorType;
const DoctorAppointment = db.doctorAppointment;

app.get("/doctor-list", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [DoctorType, DoctorAppointment],
      order: [["createdAt", "DESC"]],
    });
    const doctorTypes = await DoctorType.findAll();
    console.log("test------------------------");
    res.render("doctorList", {
      doctorList: doctors,
      doctorTypes: doctorTypes,
      doctorNumber: 1,
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.render("doctorList", {
      doctorList: null,
      doctorTypes: null,
      doctorNumber: 1,
    });
    // res.status(500).send("Internal Server Error");
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
    console.log(req.body);
    const selectedOption = req.body.type_id.split("|");
    const doctor = await Doctor.create({
      name: req.body.name,
      type_name: selectedOption[1],
      type_id: selectedOption[0],
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
app.get("/edit-doctor/:doctor_id", async (req, res) => {
  const doctorId = req.params.doctor_id;
  console.log("doctorId" + doctorId);
  try {
    // Find the doctor by ID

    const doctorTypes = await DoctorType.findAll();
    const doctor = await Doctor.findByPk(doctorId, {
      include: [DoctorType, DoctorAppointment],
    });
    console.log("doctor" + JSON.stringify(doctor, null, 2));

    res.render("editDoctor", {
      doctorTypes: doctorTypes,
      doctor: doctor,
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Set up the route for updating a doctor
app.post("/update-doctor/:id", async (req, res) => {
  const doctorId = req.params.id;
  try {
    // Find the doctor by ID
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Update the doctor's details
    await doctor.update({
      name: req.body.name,
      type_name: req.body.type_id.split("|")[1], // Extracting the doctor_type_name from the combined value
      type_id: req.body.type_id.split("|")[0],
      details1: req.body.details1,
      details2: req.body.details2,
      details3: req.body.details3,
      appointment_time: req.body.appointment_time,
      appointment_fees: req.body.appointment_fees,
      appointment_venue: req.body.appointment_venue,
      mobile_number: req.body.mobile_number,
      // Update other fields as required
    });

    // Delete existing appointments for the doctor
    await DoctorAppointment.destroy({ where: { doctor_id: doctorId } });

    // Create new appointments for the doctor
    const appointmentDates = req.body.appointment_dates;
    if (appointmentDates && Array.isArray(appointmentDates)) {
      await Promise.all(
        appointmentDates.map(async (date) => {
          await DoctorAppointment.create({
            doctor_id: doctorId,
            appointment_date: date,
          });
        })
      );
    }

    res.redirect("/doctor-list");
  } catch (err) {
    console.error("Error updating doctor:", err);
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

app.get("/add-workshop", async (req, res) => {
  try {
    res.render("addWorkshop");
  } catch (err) {
    console.error("Error fetching workshop list", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add-workshop-list", async (req, res) => {
  try {
    // Save the workshop data to the database using Sequelize model
    console.log("----------------------");
    const Workshop = db.workshop;
    await Workshop.create(req.body);
    res.redirect("/workshop-list");
  } catch (err) {
    // Handle any errors that occur during data insertion
    console.error(error);
    res.send("Error adding workshop. Please try again.");
  }
});

app.get("/edit-workshops/:id", async (req, res) => {
  const workshopId = req.params.id;
  try {
    const Workshop = db.workshop;
    const workshopDetails = await Workshop.findByPk(workshopId);
    res.render("editWorkshop", { workshop: workshopDetails });
  } catch (err) {
    console.error("Error fetching workshop list", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update-workshop/:id", async (req, res) => {
  const workshopId = req.params.id;
  try {
    const Workshop = db.workshop;
    const workshopDetails = await Workshop.findByPk(workshopId);
    await workshopDetails.update(req.body);
    res.redirect("/workshop-list");
  } catch (err) {
    console.error("Error fetching workshop list", err);
    res.status(500).send("Internal Server Error");
  }
});
//doctor type List

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
app.get("/add-doctor-type", async (req, res) => {
  try {
    res.render("addDoctorType");
  } catch (err) {
    console.error("Error fetching doctors list:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add-doctor-type", async (req, res) => {
  try {
    const doctorType = await DoctorType.create({
      doctor_type_name: req.body.doctor_type_name,
    });
    res.redirect("/doctor-type-list");
  } catch (err) {
    console.error("Error fetching doctors list:", err);
    res.status(500).send("Internal Server Error");
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

app.get("/add-book-type", async (req, res) => {
  try {
    res.render("addBookType");
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/add-book-type", async (req, res) => {
  try {
    const BookingType = db.bookingType;
    const bookingType = await BookingType.create({
      booking_type_name: req.body.booking_type_name,
    });
    res.redirect("/book-type-list");
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).send("Internal Server Error");
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
