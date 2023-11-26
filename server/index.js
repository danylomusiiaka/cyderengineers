const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/yukisdb");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)

app.post('/adduser', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = new userModel({
        email: email,
        password: password
    })

    await user.save()
    res.send('200 Success')
})

app.listen(3001, () => {
    console.log("connected to port 3001");
})