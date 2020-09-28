const { Client } = require('pg')
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('cookie-session')
const passport = require('passport');
const appProperties = require('./appProperties');
const router = express.Router();
const initializePassport = require('./auth/passportConfig');

const loginService = require('./services/auth/loginService');
const empService = require('./services/employeeService')

initializePassport(passport);

let corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

let sessionDetails = { 
    secret: process.env.COOKIE_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: { 
        sameSite:"none",
        secure: true, 

    //     signed: true
    }
}

// Middlewares
app.use(cors(corsOptions))
app.use(session({
    secret:process.env.COOKIE_SECRET,
    // secure: true,
    // sameSite:"none",
}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

// Import all controllers
require('./routes/subjectController')(app);
require('./routes/jobContorller')(app);
require('./routes/employeeController')(app);
require('./routes/auth/loginController')(app, passport);

// loginService.verifyUser('111333001', 'password').then((res) => {
//     console.log(res)
// })


app.listen(appProperties.port, () => {
    console.log(`Listening on ${appProperties.port}`)
})