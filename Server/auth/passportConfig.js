const LocalStrategy = require('passport-local').Strategy;
const { querySchoolDB } = require('../DB/SchoolDB');
const encryptor = require('bcrypt');
const { verifyUser } = require('../services/auth/loginService')
const empService = require('../services/employeeService')
// const passport = require('passport');

const initialize = (passport) => {
    const authenticateUser = (id, password, done) => {
        verifyUser(id, password).then((res) => {
            return done(null, res, res ? {} : { message: "מספר תז או סיסמה לא נכונים" })
        })
    }

    passport.use(new LocalStrategy({ usernameField: "id", passwordField: "password"}, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.emp_id)
    });
    passport.deserializeUser((id, done) => {
        empService.getEmployeeById(id).then(res => {
            return done(null, res)
        })
    })
}

module.exports = initialize;