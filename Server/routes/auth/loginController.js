const { ensureAuthenticated } = require("../../auth/authentication");
const loginService = require("../../services/auth/loginService");
const { ROLES } = require("../../auth/roleCheck");

module.exports = (app, passport, io) => {
  app.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.isAuthenticated() && req.body.attempt) {
      io.sockets.emit("signIn", {
        id: req.user.emp_id,
        name: req.user.emp_name,
      });
    }
    res.json({ success: req.isAuthenticated(), role: req.user.job_id });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.json({ success: true });
  });
};

// Old auth
// module.exports = (app) => {
//     app.post('/login', (req, res) => {
//         console.log(req.body)
//         loginService.verifyUser(req.body.id, req.body.password).then(data => {
//             res.cookie('user_id', req.body.id, { secure: true })
//             res.json({
//                 valid: data,
//                 // cookie: data ? res.cookie('user_id', req.body.id, { secure: true }) : ""
//             })
//         }).catch(err => {
//             console.log(err)
//             res.send("שגיאה באימות משתמש")
//         })
//     })
// }
