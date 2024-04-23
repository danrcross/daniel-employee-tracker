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
    return `UPDATE TABLE employee SET role_id=${this.role} WHERE id=${this.empId}`;
  }
}

module.exports = QueryMaker;
