// Server-side code (app.js)
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbconfig');
const app = express();
const dotenv = require('dotenv').config();
const Port = process.env.PORT || 5000;
const authroute = require("./routes/authroute");
const ProductRout = require("./routes/ProductRout");
const User = require('./models/User');
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middlewares/errorhandler');
const cookieParser = require("cookie-parser");
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authroute);
app.use("/api/product", ProductRout);

app.use(notFound);
app.use(errorHandler);

app.listen(Port, () => {
  try {
    console.log(`Server is running on port: ${Port}`);
  } catch (error) {
    console.log(error);
  }
});
