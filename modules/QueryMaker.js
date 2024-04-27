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
  viewEmpByM() {
    return `SELECT * FROM employee WHERE manager_id=${this.managerId}`;
  }
  viewEmpByD() {
    return `SELECT e.* FROM department d JOIN role r ON d.id = r.department_id JOIN employee e ON r.id = e.role_id WHERE d.id=${this.deptId}`;
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
