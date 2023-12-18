// Import necessary packages
const inquirer = require("inquirer");
const mysql = require('mysql2');

let sql;
const questions = [{
          name: "userChoice",
          message: "Welcome to VS Workforce Tracker!\nPlease choose the options from the below: ",
          type: "list",
     choices: ["View all Department",
                "View all Roles",
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

               if (answers.userChoice === "View all Department") {
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

               db.query(sql, function (err, results) {
                    return console.table(results);
               });      
          }
     });