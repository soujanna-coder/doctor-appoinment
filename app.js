const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
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

// workshop
const appointmentRouter = require("./routes/appointmentRouter");
app.use("/api/appointment", appointmentRouter);

app.get("/", (req, res) => {
  res.render("login", { errorMessage: null });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // Set the content type for CSS files
// app.get("*.css", (req, res) => {
//   res.header("Content-Type", "text/css");
//   res.sendFile(__dirname + req.url);
// });
// api
// app.get("/", (req, res) => {
//   res.json({
//     name: "Joyguru",
//     email: "Joyguru@gmail.com",
//   });
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
    res.redirect("/dashboard");
  } else {
    // Invalid credentials, show login page with error message
    res.render("login", { errorMessage: "Invalid username or password" });
  }
});

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
