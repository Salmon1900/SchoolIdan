import React from 'react';
import EmployeeProfileCard from './EmployeeProfileCard';


const EmployeeList = ({employees}) => {
    
    const renderEmployeeCards = (employeeList) => {
        if(!employeeList){
            return(<div>
                אין
            </div>)
        }
        return(
            employeeList.map(emp => <EmployeeProfileCard key={emp.emp_id} employee={emp}/>)
        )
    }

    return (
        <div>
            {renderEmployeeCards(employees)}
        </div>
    )
}

export default EmployeeList;