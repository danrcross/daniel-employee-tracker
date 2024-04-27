// Class contains constructor that takes in arguments from any new instance of class
// Also contains methods to create queries constructed with the arguments passed into class instance
class QueryMaker {
  constructor(table, columns, values, role, empId, managerId) {
    this.table = table;
    this.columns = columns;
    this.values = values;
    this.role = role;
    this.empId = empId;
    this.managerId = managerId;
  }
  viewAll() {
    return `SELECT * FROM ${this.table}`;
  }
  viewEmpByM() {
    return `SELECT * FROM employee WHERE manager_id=${this.managerId}`;
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
}

// Exports 'QueryMaker' class to be used elsewhere
module.exports = QueryMaker;
