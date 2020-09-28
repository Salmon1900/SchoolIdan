module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
           return next();
        } else {
           return res.status(401).send("אינך מורשה");
        }
    },
    

    // For future use (Role implementation)
    // ensureAdmin: (req, res, next) => {
    //   // ensure authenticated user exists with admin role, 
    //   // otherwise send 401 response status
    //   if (req.user && req.user.role == 'ADMIN') {
    //       return next();
    //   } else {
    //       return res.send(401);
    //   }
    // },
}