require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const petRouter = require("./Routes/PetRoute");
const AdoptFormRoute = require("./Routes/AdoptFormRoute");
const AdminRoute = require("./Routes/AdminRoute");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

/* ---------------- ROUTES ---------------- */
app.use(petRouter);
app.use("/form", AdoptFormRoute);
app.use("/admin", AdminRoute);

/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("PetStore Backend Live on Vercel 🚀");
});

/* ---------------- DB CONNECTION ---------------- */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.mongooseURL);
  isConnected = true;
  console.log("MongoDB Connected");
}

connectDB();

/* ---------------- EXPORT (IMPORTANT) ---------------- */
module.exports = app;
