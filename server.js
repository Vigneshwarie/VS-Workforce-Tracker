// Import necessary packages
const inquirer = require("inquirer");
const mysql = require('mysql2');
const { mainMenu, addDepartment, addRole, addEmployee, updateEmpRole } = require('./assets/questions');
const { addDepartmentSQL, addRoleSQL, addEmployeeSQL, addEmployeeManagerSQL, updateEmpRoleSQL, viewDepartmentSQL, viewRolesSQL, viewEmployeeSQL, viewEmployeeManagerSQL, viewEmployeeDepartmentSQL, viewBudgetDepartmentSQL } = require('./assets/queries');

     
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
                              db.query(addDepartmentSQL, subDeptAnswers.vDeptName, (err, result) => {
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
                              db.query(addRoleSQL, [subRoleAnswers.vJobTitle, subRoleAnswers.vDepartment, subRoleAnswers.vSalary], (err, result) => {
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
                              db.query(addEmployeeSQL, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vEmpRole], (err, result) => {
                                   if (err) {
                                        console.log(err);
                                        quit();
                                   } 
                              });
                              
                              db.query(addEmployeeManagerSQL, [subEmpAnswers.vFirstName, subEmpAnswers.vLastName, subEmpAnswers.vManagerRole], (err, result) => {
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
                              db.query(updateEmpRoleSQL, [subUpdateEmpAnswers.vEmpRole, subUpdateEmpAnswers.vFirstName, subUpdateEmpAnswers.vLastName], (err, result) => {
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
                    db.query(viewDepartmentSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else if (answers.userChoice === "View all Roles") {
                    db.query(viewRolesSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else if (answers.userChoice === "View all Employees") {
                    db.query(viewEmployeeSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else if (answers.userChoice === "View Employees by Manager") {
                    db.query(viewEmployeeManagerSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else if (answers.userChoice === "View Employees by Department") {
                    db.query(viewEmployeeDepartmentSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else if (answers.userChoice === "View Total Utilized Budget") {
                    db.query(viewBudgetDepartmentSQL, function (err, results) {
                         if (err) {
                              console.log(err);
                              quit();
                         } else {
                              console.table(results);
                              quit();
                         }    
                    });  
               } else {
                    quit();
               }          
          }
     });

// Exit application
function quit() {
     process.exit();
}