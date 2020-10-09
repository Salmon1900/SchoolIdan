const labels = require('../../utils/labels');

const newEmpValid = (emp) => {
    let reason = "";
    if(!emp.id){
        reason = reason.concat(`${labels.emp.idNotEntered}\n`);
    } else if(emp.id.length !== 9){
        reason = reason.concat(`${labels.emp.idWrongLength}\n`);
    }

    if(!emp.password){
        reason = reason.concat(`${labels.emp.passwordNotEntered}\n`);
    }

    if(!emp.job){
        reason = reason.concat(`${labels.emp.jobNotEntered}\n`);
    }

    if(!emp.name){
        reason = reason.concat(`${labels.emp.nameNotEntered}\n`);
    }

    if(emp.password.length < 6){
        reason = reason.concat(`${labels.emp.passwordTooShort}\n`);
    }

    return { isValid: !reason, reason: reason};
}

module.exports = {
    newEmpValid: newEmpValid
}