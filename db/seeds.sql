/*
Data for Department Table
*/

INSERT INTO wt_department (dept_name)
VALUES ("Sales"),
       ("Marketing"),
       ("HR"),
       ("Administration"),
       ("Finance"),
       ("Application Service"),
       ("Management");

INSERT INTO wt_role (job_title, dept_id, salary)
VALUES ("Sales Consultant", 1, 90000),
("Sales Manager", 1, 120000),
("Marketing Consultant", 2, 90000),
("Marketing Manager", 2, 120000),
("HR Executive", 3, 70000),
("HR Manager", 3, 110000),
("Admin", 4, 70000),
("Accountant", 5, 85000),
("Jr. Web Developer", 6, 85000),
("Sr. Web Developer", 6, 110000),
("Java Developer", 6, 150000),
("Python Developer", 6, 150000),
("Development Manager", 6, 210000),
("Director", 7, 510000);

/*
Without a thought built a bigger structure and struggled with numbers. I hope I mapped all roles and employees properly.

Referred names from the site https://www.kaggle.com/datasets/williamlucas0/employee-sample-data 
*/

INSERT INTO wt_employee (first_name, last_name, emp_role)
VALUES ("Jameson", "Thomas", 11), 
("Bella", "Wu", 11), 
("Jose", "Wong", 9), 
("Lucas", "Richardson", 10), 
("Gianna", "Holmes", 1), 
("Jacob", "Moore", 2), 
("Charles", "Simmons", 3), 
("Brooks", "Richardson", 13), 
("Gianna", "Jones", 4), 
("Austin", "Chow", 5), 
("Ella", "Chen", 6), 
("Ruby", "Kaur", 7), 
("Savannah", "Morales", 10), 
("Luca", "Powell", 8), 
("Mike", "Banning", 14), 
("Mike", "Ross", 12), 
("Piper", "Garcia", 1); 


INSERT INTO wt_hierarchy_relation (emp_id, manager_id)
VALUES (1, 8),
 (2, 8),
 (3, 8),
 (4, 8),
 (5, 6),
 (6, 15),
 (7, 9),
 (8, 15),
 (9, 15),
 (10, 11),
 (11, 15),
 (12, 11),
 (13, 8),
 (14, 15),
 (15, NULL),
 (16, 8),
 (17, 6);




