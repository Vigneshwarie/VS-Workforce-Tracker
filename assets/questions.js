const mainMenu = [
     {
          name: "userChoice",
          message: "Welcome to VS Workforce Tracker!\nWhat would you like to do? ",
          type: "list",
          choices: ["Add Department",
          "View all Departments",
          "Add Role",
          "View all Roles",
          "Add Employee",
           "View all Employees",
          "Update Employee Role",
          "View Employees by Manager",
          "View Employees by Department",
          "View Total Utilized Budget",
          "Exit"
               ]
     }];

const addDepartment = [
     {
          name: "vDeptName",
          message: "Please enter the name of the department: ",
          type: "input"
     }];

const addRole = [
     {
          name: "vJobTitle",
          message: "Please enter the Job Title: ",
          type: "input"
     },
     {
          name: "vDepartment",
          message: "Please choose the department of the role from the below options: ",
          type: "list",
          choices: ["Sales",
               "Marketing",
               "HR",
               "Administration",
               "Finance",
               "Application Service",
               "Management"
          ]
     },
     {
          name: "vSalary",
          message: "Please enter the Salary: ",
          type: "input"
     }];

const addEmployee = [
     {
          name: "vFirstName",
          message: "Please enter the first name of the employee: ",
          type: "input"
     },
     {
          name: "vLastName",
          message: "Please enter the last name of the employee: ",
          type: "input"
     },
     {
          name: "vEmpRole",
          message: "Please choose the role from the below options: ",
          type: "list",
          choices: ["Sales Consultant",
               "Sales Manager",
               "Marketing Consultant",
               "Marketing Manager",
               "HR Executive",
               "HR Manager",
               "Admin",
               "Accountant",
               "Jr. Web Developer",
               "Sr. Web Developer",
               "Java Developer",
               "Python Developer",
               "Development Manager"
          ]
     },
     {
          name: "vManagerRole",
          message: "Please choose the manager below: ",
          type: "list",
          choices: ["Sales Manager",
               "Marketing Manager",
               "HR Manager",
               "Development Manager",
               "Director"
          ]
     }];

const updateEmpRole = [
     {
          name: "vFirstName",
          message: "Please enter the first name of the employee: ",
          type: "input"
     },
     {
          name: "vLastName",
          message: "Please enter the last name of the employee: ",
          type: "input"
     },
     {
          name: "vEmpRole",
          message: "Please choose the role from the below options: ",
          type: "list",
          choices: ["Sales Consultant",
               "Sales Manager",
               "Marketing Consultant",
               "Marketing Manager",
               "HR Executive",
               "HR Manager",
               "Admin",
               "Accountant",
               "Jr. Web Developer",
               "Sr. Web Developer",
               "Java Developer",
               "Python Developer",
               "Development Manager"
          ]
     }];

module.exports = {mainMenu, addDepartment, addRole, addEmployee, updateEmpRole}
