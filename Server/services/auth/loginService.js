const employeeService = require('../employeeService');
const encryptor = require('bcrypt');

const verifyUser = async (userId, password) => {
    return await employeeService.getEmployeeById(userId)
        .then(async data => {
            let res;
            let user = data[0]
            if(!user){
                return false
            } else {
                await encryptor.compare(password, user.password).then(result => {
                    res = result;
                }).catch(err => {
                    console.log("Password verify error: ", err)
                })
                console.log("User verified!")
                
                return res ? user : false;
            }

        });
}

const loginService = {
    verifyUser: verifyUser
}

module.exports = loginService;