const QueryMaker = require("./main-fns");
const mysql = require("mysql2/promise");
const GetList = require("./GetList");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "asdf",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

class Queries {
  async viewDept() {
    const table = "department";
    const myQuery = new QueryMaker(table).viewAll();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async viewRole() {
    const table = "role";
    const myQuery = new QueryMaker(table).viewAll();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async viewEmployee() {
    const table = "employee";
    const myQuery = new QueryMaker(table).viewAll();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async addDepartment(res) {
    const table = "department";
    const deptName = `('${res.department}')`;
    const myQuery = new QueryMaker(table, "(name)", deptName).addItem();
    await db.then((conn) => conn.query(myQuery));
    await db
      .then((data) =>
        data.query(`SELECT * FROM department ORDER BY id DESC LIMIT 1`)
      )
      .then(([rows, field]) => {
        console.log("\nDepartments updated!");
        console.table(rows);
      });
  }

  async deptList() {
    const thisList = new GetList("SELECT * FROM department");
    await thisList.createDepartmentList(db);
    return thisList.data;
  }

  async addRole(res) {
    const table = "role";
    const columns = `(title, salary, department_id)`;
    const values = `('${res.title}','${res.salary}','${res.department}')`;
    const myQuery = new QueryMaker(table, columns, values).addItem();
    await db.then((conn) => conn.query(myQuery));
    //be more selective with table output
    await db
      .then((data) => data.query(`SELECT * FROM role ORDER BY id DESC LIMIT 1`))
      .then(([rows, field]) => {
        console.log("Role added!");
        console.table(rows);
      });
  }

  // Used my new async/await knowledge to convert recommended filter 'Promise' function:
  // https://www.npmjs.com/package/inquirer/v/8.2.4
  async salaryChecker(input) {
    const lengthCheck = await input.toString();
    if (lengthCheck.length <= 8) {
      return input;
    } else {
      return console.error("Salary must be 8 digits or less");
    }
  }

  async roleList() {
    const thisList = new GetList("SELECT title, id FROM role");
    await thisList.createRoleList(db);
    return thisList.data;
  }

  async managerList() {
    const thisList = new GetList();
    await thisList.createManagerList(db);
    return thisList.data;
  }

  async addEmployee(res) {
    const table = "employee";
    const columns = `(first_name, last_name, role_id, manager_id)`;
    const values = `('${res.first_name}','${res.last_name}','${res.role_id}', '${res.manager_id}')`;
    const myQuery = new QueryMaker(table, columns, values).addItem();
    await db.then((conn) => conn.query(myQuery));
    await db
      .then((data) =>
        // Query to show the most recent (last) entry in table:
        // Takes the table, orders it in descending order by id, and then limits table to 1 entry
        data.query(`SELECT * FROM employee ORDER BY id DESC LIMIT 1`)
      )
      .then(([rows, field]) => {
        console.log("Employee added!");
        console.table(rows);
      });
  }

  async employeeList() {
    const thisList = new GetList();
    await thisList.createEmployeeList(db);
    return thisList.data;
  }

  async updateEmployeeRole(res) {
    const table = "employee";
    const role = `${res.role}`;
    const empId = `${res.employee}`;
    const myQuery = new QueryMaker(
      table,
      undefined,
      undefined,
      role,
      empId
    ).updateEmpRole();
    await db.then((conn) => conn.query(myQuery));
    await db
      .then((data) =>
        // Query to show the updated entry
        data.query(
          `SELECT e.id, e.first_name, e.last_name, r.id AS 'role_id', r.title FROM employee e JOIN role r ON e.role_id=r.id WHERE e.id='${res.employee}';`
        )
      )
      .then(([rows, field]) => {
        console.log("Employee role updated!");
        console.table(rows);
      });
  }
}
module.exports = Queries;
