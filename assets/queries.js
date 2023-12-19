// Insert Department
const addDepartmentSQL = 'INSERT INTO wt_department (dept_name) VALUES (?)';

// Insert Role
const addRoleSQL = 'INSERT INTO wt_role (job_title, dept_id, salary) ' +
     'VALUES (?, (SELECT dept_id FROM wt_department WHERE dept_name = ?), ?)';

// Insert Employee
const addEmployeeSQL = 'INSERT INTO wt_employee (first_name, last_name, emp_role) ' +
     'VALUES (?, ?, (SELECT role_id FROM wt_role WHERE job_title = ?))';
     
// Insert Employee Manager Relationship
const addEmployeeManagerSQL = 'INSERT INTO wt_hierarchy_relation (emp_id, manager_id) ' +
                                        'VALUES ((SELECT emp_id FROM wt_employee WHERE first_name = ? AND last_name = ?), ' +
     '(SELECT emp_id FROM wt_employee WHERE emp_role IN (SELECT role_id FROM wt_role WHERE job_title = ?)))';

// Update Employee Role
const updateEmpRoleSQL = 'UPDATE wt_employee ' +
                                   'SET emp_role = (SELECT role_id FROM wt_role WHERE job_title = ?) ' +
     'WHERE first_name = ? AND last_name = ? ';

// View all Departments
const viewDepartmentSQL = 'SELECT dept_id as "Department ID", dept_name as "Department Name" FROM wt_department';  

// View all Roles
const viewRolesSQL = 'SELECT a.role_id as "Role ID", a.job_title as "Job Title", b.dept_name as "Department Name", a.salary as "Salary" '+
                                   'FROM wt_role a JOIN wt_department b '+
                                   'ON a.dept_id = b.dept_id';

// View all Employees
const viewEmployeeSQL = 'SELECT a.emp_id as "Employee ID", a.first_name as "First Name", a.last_name as "Last Name", '+ 
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

//View Employees by Manager
const viewEmployeeManagerSQL = 'SELECT CONCAT(b.first_name, " ", b.last_name) as "Employee", CONCAT(c.first_name, " ", c.last_name) as "Manager" '+
                                                            'FROM wt_hierarchy_relation a JOIN wt_employee b '+
                                                            'ON a.emp_id = b.emp_id '+
                                                            'JOIN wt_employee c '+
                                                            'ON a.manager_id = c.emp_id '+
     'ORDER BY b.first_name ASC ';

// View Employees by Department
const viewEmployeeDepartmentSQL = 'SELECT CONCAT(a.first_name, " ", a.last_name) as "Employee", c.dept_name as "Department" '+
'FROM wt_employee a JOIN wt_role b '+
'ON a.emp_role = b.role_id '+
'JOIN wt_department c '+
'ON b.dept_id = c.dept_id '+
'ORDER BY a.first_name ';
                                                            


module.exports = {addDepartmentSQL, addRoleSQL, addEmployeeSQL, addEmployeeManagerSQL, updateEmpRoleSQL, viewDepartmentSQL, viewRolesSQL, viewEmployeeSQL, viewEmployeeManagerSQL, viewEmployeeDepartmentSQL };
                                   