const { stud } = require('../../utils/labels');
const labels = require('../../utils/labels');

const newStudentValid = (student) => {
    // Rules: 
    // id - defined, length 9, 
    // name - defined,
    // birthYear - defined, Number value between 1900 and 2020
    let reason = "";
    if(!student.id){
        reason = reason.concat(`${labels.stud.idNotEntered}\n`);
    } else if(student.id.length !== 9){
        reason = reason.concat(`${labels.stud.idWrongLength}\n`);
    }

    if(!student.name){
        reason = reason.concat(`${labels.stud.nameNotEntered}\n`);
    }

    if(!student.birthYear){
        reason = reason.concat(`${labels.stud.birthYearNotEntered}\n`);
    } else if(Number(student.birthYear) < 1900 || Number(student.birthYear > 2100) || Number.isNaN(Number(student.birthYear))) {
        reason = reason.concat(`${labels.stud.invalidBirthYear}\n`)
    }

    return { isValid: !reason, reason: reason};
}

module.exports = {
    newStudentValid: newStudentValid
}