// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a few array variables that will hold the data

var reservations = [];
var waitlist = [];

// Routes
// =============================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// * Create a set of routes for getting and posting table data
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

// Create New reservations - takes in JSON input
app.post("/api/reservations", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservations = req.body;
  console.log(newReservations);
  if (reservations.length >= 5) {
    waitlist.push(newReservations);
    res.json(false);
  } else {
    reservations.push(newReservations);
    res.json(true);
  }
});

app.delete("/api/clear", function (req, res) {
  reservations = [];
  waitlist = [];
  res.json({ ok: true });
  // res.send("good!");
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App http://localhost:" + PORT);
});
