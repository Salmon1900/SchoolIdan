const ROLES = {
    // Manager role
    admin: 1,
    // Teahcer role
    employee: 2,
}

const checkIfAdmin = (req, res, next) => {
    if(req.user[0].job_id === ROLES.admin){
        return next();
    } else {
        return res.status(401).send({success: false, message: "אין לך את ההרשאות המתאימות"})
    }
}

module.exports = {
    checkIfAdmin, 
    ROLES
}
