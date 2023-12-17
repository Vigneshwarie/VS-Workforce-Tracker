DROP DATABASE IF EXISTS workforcetracker_db;
CREATE DATABASE workforcetracker_db;

USE workforcetracker_db;

CREATE TABLE wt_department (
     dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE wt_role (
     role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     job_title VARCHAR(50) NOT NULL,
     dept_id INT NULL,
     salary DECIMAL(10,2) NOT NULL,
     FOREIGN KEY (dept_id) REFERENCES wt_department(dept_id) ON DELETE SET NULL
);

CREATE TABLE wt_employee (
     emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(40) NOT NULL,
     last_name VARCHAR(40) NOT NULL,
     emp_role INT NULL,
     FOREIGN KEY (emp_role) REFERENCES wt_role(role_id) ON DELETE SET NULL
);

CREATE TABLE wt_hierarchy_relation (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     emp_id INT NULL,
     manager_id INT NULL,
     FOREIGN KEY (emp_id) REFERENCES wt_employee(emp_id) ON DELETE SET NULL,
     FOREIGN KEY (manager_id) REFERENCES wt_employee(emp_id) ON DELETE SET NULL
);


