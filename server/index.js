const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodeParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodeParser.urlencoded({ extended: true }))


app.use(session({
    key: "userID",
    secret: "123456",
    resave: false,
    saveUninitialized: false
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
    },
    isLogined: {
        type: Boolean,
        required: true
    }
})

const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    option: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)
const testModel = mongoose.model('tests', testSchema)

app.post('/adduser', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
        return res.status(400).send('Email already registered');
    }

    const user = new userModel({
        email: email,
        password: password,
        isLogined: false
    })
    req.session.user = user
    await user.save()
    res.send('200 Success')
})

app.post('/addtest', async (req, res) => {
    const name = req.body.name
    const option = req.body.option
    const description = req.body.description
    const author = req.body.author

    const test = new testModel({
        name: name,
        option: option,
        description: description,
        author: author
    })

    await test.save()
    res.send('200 Success')
})


app.get("/adduser", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.get("/tests", async (req, res) => {
    const tests = await testModel.find({});
    res.status(200).json(tests);
});

app.delete('/tests/:id', async (req, res) => {
    const testId = req.params.id;
    const deletedTest = await testModel.findByIdAndDelete(testId);
    if (!deletedTest) {
        return res.status(404).send('Test not found');
    }
});

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({ email: email, password: password });

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    user.isLogined = true;
    req.session.user = user
    await user.save();
    res.send('200 Success');
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('userID');
        res.sendStatus(200);
    });
});




app.listen(3001, () => {
    console.log("connected to port 3001");
})