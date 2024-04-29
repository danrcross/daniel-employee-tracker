// Class contains constructor that takes in arguments from any new instance of class
// Also contains methods to create queries constructed with the arguments passed into class instance
class QueryMaker {
  constructor(table, columns, values, role, empId, managerId, deptId) {
    this.table = table;
    this.columns = columns;
    this.values = values;
    this.role = role;
    this.empId = empId;
    this.managerId = managerId;
    this.deptId = deptId;
  }
  viewAll() {
    return `SELECT * FROM ${this.table}`;
  }
  viewDept() {
    return `SELECT r.id, r.title AS 'Role', d.name AS 'Department', r.salary AS 'Salary' FROM role r JOIN department d ON r.department_id=d.id`;
  }
  viewEmp() {
    return `SELECT e1.id, CONCAT(e1.first_name,' ', e1.last_name) AS 'Employee', r.title AS 'Role', d.name AS 'Department', r.salary AS 'Salary', CONCAT(e2.first_name, ' ',e2.last_name) AS 'Manager' FROM employee e1 LEFT JOIN employee e2 ON e1.manager_id=e2.id JOIN role r ON e1.role_id=r.id JOIN department d ON r.department_id=d.id ORDER BY e1.id;`;
  }
  viewEmpByM() {
    return `SELECT e1.id, CONCAT(e1.first_name,' ', e1.last_name) AS 'Employee', r.title AS 'Role', d.name AS 'Department', r.salary AS 'Salary', CONCAT(e2.first_name, ' ',e2.last_name) AS 'Manager' FROM employee e1 LEFT JOIN employee e2 ON e1.manager_id=e2.id JOIN role r ON e1.role_id=r.id JOIN department d ON r.department_id=d.id WHERE e1.manager_id=${this.managerId} ORDER BY e1.id;`;
  }
  viewEmpByD() {
    return `SELECT e1.id, CONCAT(e1.first_name,' ', e1.last_name) AS 'Employee', r.title AS 'Role', d.name AS 'Department', r.salary AS 'Salary', CONCAT(e2.first_name, ' ',e2.last_name) AS 'Manager' FROM employee e1 LEFT JOIN employee e2 ON e1.manager_id=e2.id JOIN role r ON e1.role_id=r.id JOIN department d ON r.department_id=d.id WHERE d.id=${this.deptId} ORDER BY e1.id`;
  }
  viewBudgetByD() {
    return `SELECT d.id AS 'Department ID', d.name AS 'Department', SUM(salary) AS 'Total Utilized Budget' FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON r.id = e.role_id WHERE d.id=${this.deptId}`;
  }
  addItem() {
    return `INSERT INTO ${this.table} ${this.columns} VALUES ${this.values}`;
  }
  updateEmpRole() {
    return `UPDATE employee SET role_id=${this.role} WHERE id=${this.empId}`;
  }
  updateEmpManager() {
    return `UPDATE employee SET manager_id=${this.managerId} WHERE id=${this.empId}`;
  }
  deleteRow() {
    return `DELETE FROM ${this.table} WHERE id=${this.values}`;
  }
}

// Exports 'QueryMaker' class to be used elsewhere
module.exports = QueryMaker;
