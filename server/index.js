const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/yukisdb");


