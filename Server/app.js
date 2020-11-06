// Server setup
const express = require("express");
const app = express();
const appProperties = require("./appProperties");
const http = require("http");
const socketIO = require("socket.io");

require("dotenv").config();

app.set("port", appProperties.port);

// Request and response
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("cookie-session");

// Auth
const passport = require("passport");
const initializePassport = require("./auth/passportConfig");
const cors = require("cors");

initializePassport(passport);

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const server = http.createServer(app);
const io = socketIO(server);
server.listen(appProperties.port, () => {
  console.log(`Listening on ${appProperties.port}`);
});

// io.on("connection", (socket) => {
//   io.emit("newEmp", { message: "On Connetion" });
// });

// Import all controllers
require("./routes/subjectController")(app);
require("./routes/jobContorller")(app);
require("./routes/employeeController")(app, io);
require("./routes/studentController")(app);
require("./routes/classController")(app);
require("./routes/examController")(app);
require("./routes/auth/loginController")(app, passport, io);
