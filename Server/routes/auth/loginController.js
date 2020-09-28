const loginService = require('../../services/auth/loginService');

module.exports = (app, passport) => {
    app.post('/login', passport.authenticate('local') ,(req, res) => {
        res.json({valid: req.isAuthenticated()})
    })
}

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