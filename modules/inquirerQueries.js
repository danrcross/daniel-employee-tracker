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

const viewDept = () => {
  table = "department";
  myQuery = new QueryMaker(table).viewAll();
  db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
    console.table(rows)
  );
};

const viewRole = () => {
  table = "role";
  myQuery = new QueryMaker(table).viewAll();
  db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
    console.table(rows)
  );
};

const viewEmployee = () => {
  table = "employee";
  myQuery = new QueryMaker(table).viewAll();
  db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
    console.table(rows)
  );
};

const addDepartment = (res) => {
  table = "department";
  const deptName = `('${res.department}')`;
  myQuery = new QueryMaker(table, "(name)", deptName).addItem();
  db.then((conn) => conn.query(myQuery));
  db.then((data) =>
    data.query(`SELECT * FROM department ORDER BY id DESC LIMIT 1`)
  ).then(([rows, field]) => {
    console.log("Departments updated!");
    console.table(rows);
  });
};

const deptList = async () => {
  const thisList = new GetList("SELECT * FROM department");
  await thisList.createDepartmentList(db);
  return thisList.data;
};

const addRole = (res) => {
  table = "role";
  const columns = `(title, salary, department_id)`;
  const values = `('${res.title}','${res.salary}','${res.department}')`;
  myQuery = new QueryMaker(table, columns, values).addItem();
  db.then((conn) => conn.query(myQuery));
  //be more selective with table output
  db.then((data) =>
    data.query(`SELECT * FROM role ORDER BY id DESC LIMIT 1`)
  ).then(([rows, field]) => {
    console.log("Role added!");
    console.table(rows);
  });
};

// Used my new async/await knowledge to convert recommended filter 'Promise' function:
// https://www.npmjs.com/package/inquirer/v/8.2.4
const salaryChecker = async (input) => {
  const lengthCheck = await input.toString();
  if (lengthCheck.length <= 8) {
    return input;
  } else {
    return console.error("Salary must be 8 digits or less");
  }
};

const roleList = async () => {
  const thisList = new GetList("SELECT title, id FROM role");
  await thisList.createRoleList(db);
  return thisList.data;
};

const managerList = async () => {
  const thisList = new GetList();
  await thisList.createManagerList(db);
  return thisList.data;
};

const addEmployee = (res) => {
  const columns = `(first_name, last_name, role_id, manager_id)`;
  const values = `('${res.first_name}','${res.last_name}','${res.role_id}', '${res.manager_id}')`;
  myQuery = new QueryMaker(table, columns, values).addItem();
  db.then((conn) => conn.query(myQuery));
  db.then((data) =>
    // Query to show the most recent (last) entry in table:
    // Takes the table, orders it in descending order by id, and then limits table to 1 entry
    data.query(`SELECT * FROM employee ORDER BY id DESC LIMIT 1`)
  ).then(([rows, field]) => {
    console.log("Employee added!");
    console.table(rows);
  });
};

const employeeList = async () => {
  const thisList = new GetList();
  await thisList.createEmployeeList(db);
  return thisList.data;
};

const updateEmployeeRole = (res) => {
  const table = "employee";
  const role = `${res.role}`;
  const empId = `${res.employee}`;
  myQuery = new QueryMaker(
    table,
    undefined,
    undefined,
    role,
    empId
  ).updateEmpRole();
  db.then((conn) => conn.query(myQuery));
  db.then((data) =>
    // Query to show the updated entry
    data.query(
      `SELECT e.id, e.first_name, e.last_name, r.id AS 'role_id', r.title FROM employee e JOIN role r ON e.role_id=r.id WHERE e.id='${res.employee}';`
    )
  ).then(([rows, field]) => {
    console.log("Employee role updated!");
    console.table(rows);
  });
};
module.exports = {
  viewDept,
  viewRole,
  viewEmployee,
  addDepartment,
  deptList,
  addRole,
  salaryChecker,
  roleList,
  managerList,
  addEmployee,
  employeeList,
  updateEmployeeRole,
};
