// Import necessary modules
const QueryMaker = require("./QueryMaker");
const mysql = require("mysql2/promise");
const GetList = require("./GetList");

// Creates connection to mysql database titled 'company_db'
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "asdf",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

// A class that contains methods involving various MySQL queries that will need to be made by the app
// Promise syntax used for mysql2 methods (below) comes from documentation on 'Basic Promise' for mysql2: https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
class Queries {
  // Async. fn that will show the department table.
  // Uses QueryMaker module to produce correct query, then makes query to the database
  async viewDept() {
    const table = "department";
    const myQuery = new QueryMaker(table).viewAll();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  // similar to above
  async viewRole() {
    const myQuery = new QueryMaker().viewDept();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  // similar to above
  async viewEmployee() {
    const myQuery = new QueryMaker().viewEmp();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async viewEmployeeByM(res) {
    const myQuery = new QueryMaker(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      res.manager
    ).viewEmpByM();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async viewEmployeeByD(res) {
    const myQuery = new QueryMaker(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      res.department
    ).viewEmpByD();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  async viewBudgetByD(res) {
    const myQuery = new QueryMaker(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      res.department
    ).viewBudgetByD();
    await db
      .then((conn) => conn.query(myQuery))
      .then(([rows, fields]) => console.table(rows));
  }

  // Adds department to 'department' table; 'res' parameter will take in user inquirer response as argument
  // Similar to above fn's, uses QueryMaker to produce query, then sends query to database(adds department).
  // Also gives new table item as feedback
  async addDepartment(res) {
    const table = "department";
    const deptName = `('${res.department}')`;
    const myQuery = new QueryMaker(table, "(name)", deptName).addItem();
    await db.then((conn) => conn.query(myQuery));
    await db
      .then((data) =>
        data.query(
          `SELECT id, name AS 'Department' FROM department ORDER BY id DESC LIMIT 1`
        )
      )
      .then(([rows, field]) => {
        console.log("\nDepartments updated!");
        console.table(rows);
      });
  }

  // fn to produce an array-format list to be used by inquirer to produce a list of departments
  // passes db connection to GetList.createDepartmentList(db) fn; fn parses the data pulled.
  async deptList() {
    const thisList = new GetList("SELECT * FROM department");
    await thisList.createDepartmentList(db);
    return thisList.data;
  }

  // similar to addDepartment
  async addRole(res) {
    const table = "role";
    const columns = `(title, salary, department_id)`;
    const values = `('${res.title}','${res.salary}','${res.department}')`;
    const myQuery = new QueryMaker(table, columns, values).addItem();
    await db.then((conn) => conn.query(myQuery));
    //be more selective with table output
    await db
      .then((data) =>
        data.query(
          `SELECT r.id, r.title AS 'Role', r.salary AS 'Salary', d.name AS 'Department' FROM role r JOIN department d ON r.department_id=d.id ORDER BY id DESC LIMIT 1`
        )
      )
      .then(([rows, field]) => {
        console.log("Role added!");
        console.table(rows);
      });
  }

  // Used recommended filter 'Promise' function:
  // https://www.npmjs.com/package/inquirer/v/8.2.4
  salaryChecker(input) {
    // Had to refresh on regex/ regex.prototype.test() method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    return new Promise((resolve, reject) => {
      const regex = /^\d+(\.\d+)?$/;
      const isNumber = regex.test(input);
      if (isNumber) {
        const decimalFormat = input.toFixed(2);
        console.log(decimalFormat);
        const lengthCheck = decimalFormat.toString();
        if (lengthCheck.length <= 18) {
          resolve(decimalFormat);
        } else {
          reject(
            new Error(
              "ERROR: Salary must adhere to following format: \n  1. No commas in number\n  2. May include 2 decimal places\n  3. Must be LESS THAN 21 digits WITH decimals OR LESS THAN 19 digits WITHOUT decimals\n"
            )
          );
        }
      } else {
        reject(
          new Error(
            "NOT A NUMBER: Salary must adhere to following format: \n  1. No commas in number\n  2. May include 2 decimal places\n  3. Must be LESS THAN 21 digits WITH decimals OR LESS THAN 19 digits WITHOUT decimals\n"
          )
        );
      }
    });
  }

  // similar to deptList
  async roleList() {
    const thisList = new GetList("SELECT title, id FROM role");
    await thisList.createRoleList(db);
    return thisList.data;
  }

  // similar to above
  async managerList() {
    const thisList = new GetList();
    await thisList.createManagerList(db);
    return thisList.data;
  }

  // similar to addDepartment
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
        data.query(
          `SELECT e1.id, CONCAT(e1.first_name,' ', e1.last_name) AS 'Employee', r.title AS 'Role', d.name AS 'Department', r.salary AS 'Salary', CONCAT(e2.first_name, ' ',e2.last_name) AS 'Manager' FROM employee e1 LEFT JOIN employee e2 ON e1.manager_id=e2.id JOIN role r ON e1.role_id=r.id JOIN department d ON r.department_id=d.id ORDER BY e1.id DESC LIMIT 1`
        )
      )
      .then(([rows, field]) => {
        console.log("Employee added!");
        console.table(rows);
      });
  }

  // similar to deptList
  async employeeList() {
    const thisList = new GetList();
    await thisList.createEmployeeList(db);
    return thisList.data;
  }

  // similar in structure to the 'add...' functions, but uses an update query instead.
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

  // Same as above
  async updateEmployeeManager(res) {
    const table = "employee";
    const managerId = `${res.manager}`;
    const empId = `${res.employee}`;
    const myQuery = new QueryMaker(
      table,
      undefined,
      undefined,
      undefined,
      empId,
      managerId
    ).updateEmpManager();
    await db.then((conn) => conn.query(myQuery));
    await db
      .then((data) =>
        // Query to show the updated entry
        data.query(
          `SELECT e1.id, e1.first_name, e1.last_name, e2.id AS 'manager id', e2.first_name AS 'manager_first', e2.last_name AS 'manager_last' FROM employee e1 JOIN employee e2 ON e1.manager_id=e2.id WHERE e1.id=${res.employee}`
        )
      )
      .then(([rows, field]) => {
        console.log("Employee manager updated!");
        console.table(rows);
      });
  }
  async employeeMList() {
    const thisList = new GetList();
    await thisList.createEmployeeMList(db);
    return thisList.data;
  }

  async tableList() {
    const thisList = new GetList();
    await thisList.createTableList(db);
    return thisList.data;
  }

  async deleteDepartment(res) {
    const table = "department";
    const id = `${res.department}`;
    const myQuery = new QueryMaker(table, undefined, id).deleteRow();
    await db.then((conn) => conn.query(myQuery));
    //be more selective with table output
    await db
      .then((data) => data.query(`SELECT * FROM department`))
      .then(([rows, field]) => {
        console.log("Department deleted!");
        console.table(rows);
      });
  }
  async deleteRole(res) {
    const table = "role";
    const id = `${res.role}`;
    const myQuery = new QueryMaker(table, undefined, id).deleteRow();
    await db.then((conn) => conn.query(myQuery));
    //be more selective with table output
    await db
      .then((data) => data.query(`SELECT * FROM role`))
      .then(([rows, field]) => {
        console.log("Role deleted!");
        console.table(rows);
      });
  }
  async deleteEmployee(res) {
    const table = "employee";
    const id = `${res.employee}`;
    const myQuery = new QueryMaker(table, undefined, id).deleteRow();
    await db.then((conn) => conn.query(myQuery));
    //be more selective with table output
    await db
      .then((data) => data.query(`SELECT * FROM employee`))
      .then(([rows, field]) => {
        console.log("Employee deleted!");
        console.table(rows);
      });
  }
  // simply ends connection to database
  async endConnection() {
    await db.then((conn) => conn.end());
  }
}

// Export 'Queries' class to be used by other scripts
module.exports = Queries;
