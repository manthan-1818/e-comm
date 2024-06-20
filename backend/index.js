const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require('path');
const database = require("./database/connection");
const userRoutes = require("./Routes/userroutes");
const productRoutes = require('./Routes/productroutes');

const cors = require("cors");
const orderRouter = require("./Routes/orderroutes");

// Connect to database
database();

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://192.168.2.85:3000", "http://192.168.2.85:3000/", "http://localhost:3000/","http://localhost:3000"] }));

// Routes
app.use("/submit", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/product", productRoutes);
app.use("/order",orderRouter)

app.get("/", (req, res) => {
  res.json("Welcome to the demo API");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
