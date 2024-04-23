class QueryMaker {
  constructor(table, columns, role, empId) {
    this.table = table;
    this.columns = columns;
    this.role = role;
    this.empId = empId;
  }
  viewAll() {
    return `SELECT * FROM ${this.table}`;
  }
  addItem() {
    return `INSERT INTO ${this.table} VALUES ${this.columns}`;
  }
  updateEmpRole() {
    return `UPDATE TABLE employee SET role_id=${this.role} WHERE id=${this.empId}`;
  }
}

module.exports = QueryMaker;
