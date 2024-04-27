// Class contains constructor that takes in arguments from any new instance of class
// Also contains methods to create queries constructed with the arguments passed into class instance
class QueryMaker {
  constructor(table, columns, values, role, empId) {
    this.table = table;
    this.columns = columns;
    this.values = values;
    this.role = role;
    this.empId = empId;
  }
  viewAll() {
    return `SELECT * FROM ${this.table}`;
  }
  addItem() {
    return `INSERT INTO ${this.table} ${this.columns} VALUES ${this.values}`;
  }
  updateEmpRole() {
    return `UPDATE employee SET role_id=${this.role} WHERE id=${this.empId}`;
  }
}

// Exports 'QueryMaker' class to be used elsewhere
module.exports = QueryMaker;
