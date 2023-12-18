// Import necessary packages
const inquirer = require("inquirer");
const mysql = require('mysql2');

let sql;
const questions = [{
          name: "userChoice",
          message: "Welcome to VS Workforce Tracker!\nWhat would you like to do? ",
          type: "list",
     choices: ["Add Employee",
          "Update Employee Role",
          "View all Roles",
          "Add Role",
          "View all Departments",
          "Add Department",
          "View all Employees"
               ]
}];
     
inquirer
     .prompt(questions)
     .then((answers) => {
          console.log(answers.userChoice)

          if (answers.userChoice) {
               // Connect to database
               const db = mysql.createConnection(
                    {
                         host: 'localhost',
                         user: '',
                         password: '',
                         database: 'workforcetracker_db'
                    },
                    console.log(`Connected to the workforcetracker_db database.`)
               );
               
               if (answers.userChoice === "Add Employee") {
                    inquirer
                         .prompt([
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
                              }
                         ])
                         .then((subEmpAnswers) => {
                              sql = 'INSERT INTO wt_employee (first_name, last_name, emp_role) ' +
                                   'VALUES (?, ?, (SELECT role_id FROM wt_role WHERE job_title = ?))';
                              
                              db.query(sql, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vEmpRole], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                   } else {
                                        console.log(result);
                                   }
                              });

                              sql = 'INSERT INTO wt_hierarchy_relation (emp_id, manager_id) ' +
                                        'VALUES ((SELECT emp_id FROM wt_employee WHERE first_name = ? AND last_name = ?), ' +
                                   '(SELECT emp_id FROM wt_employee WHERE emp_role IN (SELECT role_id FROM wt_role WHERE job_title = ?)))';
                              
                              db.query(sql, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vManagerRole], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                   } else {
                                        console.log(result);
                                   }
                              });
                         });              
               }
               else if (answers.userChoice === "View all Department") {
                    sql = 'SELECT dept_id as "Department ID", dept_name as "Department Name" FROM wt_department';                 
               } else if (answers.userChoice === "View all Roles") {
                    sql = 'SELECT a.role_id as "Role ID", a.job_title as "Job Title", b.dept_name as "Department Name", a.salary as "Salary" '+
                                   'FROM wt_role a JOIN wt_department b '+
                                   'ON a.dept_id = b.dept_id';
               } else if (answers.userChoice === "View all Employees") {
                    sql = 'SELECT a.emp_id as "Employee ID", a.first_name as "First Name", a.last_name as "Last Name", '+ 
                              'b.job_title as "Title", c.dept_name as "Department", b.salary as "Salary", CONCAT(e.first_name, " ", e.last_name) as "Manager" '+
                              'FROM wt_employee a JOIN wt_role b '+
                              'ON a.emp_role = b.role_id '+
                              'JOIN wt_department c '+
                              'ON b.dept_id = c.dept_id '+
                              'JOIN wt_hierarchy_relation d '+
                              'ON a.emp_id = d.emp_id '+
                              'left outer JOIN wt_employee e '+
                              'ON d.manager_id = e.emp_id '+
                              'ORDER BY a.emp_id ';
               }

               if (answers.userChoice === "View all Department" || answers.userChoice === "View all Roles" || answers.userChoice === "View all Employees") {
                    db.query(sql, function (err, results) {
                         if (err) {
                              console.log(err);
                         } else {
                              console.table(results);
                         }    
                    });   
               }                 
          }
     });