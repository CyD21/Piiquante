const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const userRoutes = require("./routes/user");
const saucesRoutes = require("./models/sauces");
const path = require("path");

const app = express();
dotenv.config();

// !====CONNECTION BASE DE DONNEES=================
mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// !===============================================

// !====CORS (Cross-Origin Ressoure Sharing)=======
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// !=================================================
app.use(express.json());
app.use(helmet());
app.use("/api/auth", userRoutes);
app.use("/api/saucesRoutes", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
