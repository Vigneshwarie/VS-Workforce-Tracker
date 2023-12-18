// Import necessary packages
const inquirer = require("inquirer");
const mysql = require('mysql2');

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
                         user: 'vigneswari',
                         password: 'p@ssword@123',
                         database: 'workforcetracker_db'
                    },
                    console.log(`Connected to the workforcetracker_db database.`)
               );

               db.query('SELECT * FROM wt_department', function (err, results) {
                    console.log(results);
               });
          }
     });