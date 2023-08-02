import '../index.css';
import Employee from '../components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header';
import React, { Component } from 'react';


function Employees() {
  const [ role, setRole ] = useState();
  const [employees, setEmployees] = useState(
    [
      {
        id: 1,
        name: "Sally",
        role: "Intern",
        img: "https://images.pexels.com/photos/789305/pexels-photo-789305.jpeg"
      },
      {
        id: 2,
        name: "Mia",
        role: "Master",
        img: "https://images.pexels.com/photos/2755165/pexels-photo-2755165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 3,
        name: "Leah",
        role: "Developer",
        img: "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 4,
        name: "Ari",
        role: "Developer",
        img: "https://images.pexels.com/photos/4993292/pexels-photo-4993292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 5,
        name: "Joseph",
        role: "Manager",
        img: "https://images.pexels.com/photos/4197932/pexels-photo-4197932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 6,
        name: "Liam",
        role: "Designer",
        img: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 7,
        name: "Math",
        role: "Developer",
        img: "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: 8,
        name: "Sara",
        role: "Manager",
        img: "https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  );

  function updateEmployee(id, newName, newRole){
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id){
        //return employee
        return {...employee, name: newName, role: newRole}
      }

      return employee;
    });
    setEmployees(updatedEmployees);

  }

  function newEmployee(name, role, img){
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img
    }
    setEmployees([...employees, newEmployee])
  }


  const showEmployees = true;
  return (
    <div>
      {showEmployees ? 
      <>

        <div className='flex flex-wrap justify-center pt-5'>
          {employees.map((employee) => {

              const editEmployee = (
                  <EditEmployee
                    id={employee.id}
                    name={employee.name} 
                    role={employee.role}
                    updateEmployee={updateEmployee}
                  />
              );

              return(
                    <Employee 
                    key={employee.id}
                    id={employee.id}
                    name={employee.name} 
                    role={employee.role} 
                    img={employee.img}
                    editEmployee={editEmployee}
                    />
              );
              
          })}
        </div>
        <AddEmployee newEmployee={newEmployee}/>
      </>
        :
        <p>You cannot see any employee</p>
      }

        
    </div>
  );
}

export default Employees;
