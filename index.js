const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path')
const morgan = require('morgan');
const routes = require("./routes/index");
require("dotenv").config();


const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan("combined"));
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const { PORT } = process.env.PORT

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MongoURI, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port: ${PORT}...`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
