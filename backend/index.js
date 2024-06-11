const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require('path');
const database = require("./database/connection");
const userRoutes = require("./Routes/userroutes");
const productRoutes = require('./Routes/productroutes');

const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3000/"] }));

database();

app.use("/submit", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/product", productRoutes)

app.use("/", (req, res) => {
  res.json("demo api");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
