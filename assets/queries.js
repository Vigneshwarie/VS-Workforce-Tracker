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


module.exports = {addDepartmentSQL, addRoleSQL, addEmployeeSQL, addEmployeeManagerSQL, updateEmpRoleSQL};
                                   