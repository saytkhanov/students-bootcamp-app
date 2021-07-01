const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MongoURI, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    app.listen(process.env.PORT, () => {
      console.log(`Server has been started on port: ${process.env.PORT}...`)
    })
  } catch (e)  {
    console.log(e.message)
  }
}

start();