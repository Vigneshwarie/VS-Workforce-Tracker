// Import necessary packages
const inquirer = require("inquirer");
const mysql = require('mysql2');
const {mainMenu, addDepartment, addRole, addEmployee, updateEmpRole} = require('./assets/questions')

let sql;
     
inquirer
     .prompt(mainMenu)
     .then((answers) => {
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
               
               if (answers.userChoice === "Add Department") {
                    inquirer
                         .prompt(addDepartment)
                         .then((subDeptAnswers) => { 
                              sql = 'INSERT INTO wt_department (dept_name) VALUES (?)';

                              db.query(sql, subDeptAnswers.vDeptName, (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } else {
                                        console.log(`Added ${subDeptAnswers.vDeptName} to the database`);
                                        quit();
                                   }
                              });
                         });
               }
               else if (answers.userChoice === "Add Role") {
                    inquirer
                         .prompt(addRole)
                         .then((subRoleAnswers) => {
                              sql = 'INSERT INTO wt_role (job_title, dept_id, salary) ' +
                                   'VALUES (?, (SELECT dept_id FROM wt_department WHERE dept_name = ?), ?) ';
                              
                              db.query(sql, [subRoleAnswers.vJobTitle, subRoleAnswers.vDepartment, subRoleAnswers.vSalary], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } else {
                                        console.log(`Added ${subRoleAnswers.vJobTitle} to the database`);
                                        quit();
                                   }
                              });
                         });     
               }
               else if (answers.userChoice === "Add Employee") {
                    inquirer
                         .prompt(addEmployee)
                         .then((subEmpAnswers) => {
                              sql = 'INSERT INTO wt_employee (first_name, last_name, emp_role) ' +
                                   'VALUES (?, ?, (SELECT role_id FROM wt_role WHERE job_title = ?))';
                              
                              db.query(sql, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vEmpRole], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } 
                              });

                              sql = 'INSERT INTO wt_hierarchy_relation (emp_id, manager_id) ' +
                                        'VALUES ((SELECT emp_id FROM wt_employee WHERE first_name = ? AND last_name = ?), ' +
                                   '(SELECT emp_id FROM wt_employee WHERE emp_role IN (SELECT role_id FROM wt_role WHERE job_title = ?)))';
                              
                              db.query(sql, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vManagerRole], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } else {
                                        console.log(`Added ${subEmpAnswers.vFirstName} ${subEmpAnswers.vLastName} to the database`);
                                        quit();
                                   }
                              });
                         });              
               }
               else if (answers.userChoice === "Update Employee Role") {
                    inquirer
                         .prompt(updateEmpRole)
                         .then((subUpdateEmpAnswers) => {
                              sql = 'UPDATE wt_employee ' +
                                   'SET emp_role = (SELECT role_id FROM wt_role WHERE job_title = ?) ' +
                                   'WHERE first_name = ? AND last_name = ? ';
                              
                              db.query(sql, [subUpdateEmpAnswers.vEmpRole, subUpdateEmpAnswers.vFirstName, subUpdateEmpAnswers.vLastName], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } else {
                                        console.log(`Updated ${subUpdateEmpAnswers.vEmpRole} to the database`);
                                        quit();
                                   }
                              });
                         });
               }
               else if (answers.userChoice === "View all Departments") {
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

               if (answers.userChoice === "View all Departments" || answers.userChoice === "View all Roles" || answers.userChoice === "View all Employees") {
                    db.query(sql, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });   
               }                 
          }
     });

// Exit application
function quit() {
     process.exit();
}