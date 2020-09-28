import React, {useEffect, useState} from "react";
import { getAllEmployees, getEmployeeQualifications } from "../../api/employeeApi";
import EmployeeProfileCard from './EmployeeProfileCard';

const Home = ({isLoggedIn}) => {
    const [employees, setEmployeeList] = useState([]);
    const [empQualifications, setQualificationList] = useState([]);

    useEffect(() => {
          getAllEmployees().then(res => {
            setEmployeeList(res);
          })
    }, [])


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

    return(
        <div>
            {renderEmployeeCards(employees, empQualifications)}
        </div>
    )
}

export default Home;