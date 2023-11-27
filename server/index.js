const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodeParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cors({
    origin: ['http://localhost:5174'],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodeParser.urlencoded({ extended: true }))


app.use(session({
    key: "userID",
    secret: "123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))

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

    req.session.user = user
    console.log(req.session.user);
    await user.save()
    res.send('200 Success')
})


app.get("/adduser", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.listen(3001, () => {
    console.log("connected to port 3001");
})