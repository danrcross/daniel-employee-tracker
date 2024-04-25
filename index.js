const inquirer = require("inquirer");
const QueryMaker = require("./modules/main-fns");
const mysql = require("mysql2/promise");
const GetList = require("./modules/GetList");

// Syntax below comes from documentation on 'Basic Promise' for mysql2: https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "asdf",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

// Need to find a way to import department list from my DB

const userInput = inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        // "Update An Employee Role",
      ],
    },
  ])
  .then((res) => {
    const action = res.action;
    let table = "";
    let department = "";
    if (action === "View All Departments") {
      table = "department";
      myQuery = new QueryMaker(table).viewAll();
      db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
        console.table(rows)
      );
    } else if (action === "View All Roles") {
      table = "role";
      myQuery = new QueryMaker(table).viewAll();
      db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
        console.table(rows)
      );
    } else if (action === "View All Employees") {
      table = "employee";
      myQuery = new QueryMaker(table).viewAll();
      db.then((conn) => conn.query(myQuery)).then(([rows, fields]) =>
        console.table(rows)
      );
    } else if (action === "Add A Department") {
      table = "department";
      inquirer
        .prompt([
          {
            type: "text",
            name: "department",
            message: "What is the name of the department?",
          },
        ])
        .then((res) => {
          const deptName = `('${res.department}')`;
          myQuery = new QueryMaker(table, "(name)", deptName).addItem();
          db.then((conn) => conn.query(myQuery));
          db.then((data) =>
            data.query(`SELECT * FROM department ORDER BY id DESC LIMIT 1`)
          ).then(([rows, field]) => {
            console.log("Departments updated!");
            console.table(rows);
          });
        });
    } else if (action === "Add A Role") {
      table = "role";
      const deptList = async () => {
        const thisList = new GetList("SELECT * FROM department");
        await thisList.createDepartmentList(db);

        return thisList.data;
      };
      inquirer
        .prompt([
          {
            type: "text",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "list",
            name: "department",
            message: "What department does this role belong to?",
            // I used Xpert Learning Assistant to help me to understand the difference between passing a function reference and passing a function with ().
            // Passing a function reference ensures that the function is not executed prematurely, but when it is needed in the order of the prompts.
            choices: deptList,
          },
          {
            type: "number",
            name: "salary",
            message: "What is the salary of this role?",
            // NEED TO WORK THIS OUT!! DECIMAL CHECKER!!
            filter: (input) => {
              return new Promise((resolve, reject) => {
                const lengthCheck = input.toString();
                if (lengthCheck.length <= 8) {
                  resolve(input);
                } else {
                  reject(new Error("Salary must be 8 digits or less"));
                }
              });
            },
          },
        ])
        .then((res) => {
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
        });
    } else if (action === "Add An Employee") {
      table = "employee";
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

      inquirer
        .prompt([
          {
            type: "text",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "text",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager_id",
            message: "What is the employee's manager's name?",
            choices: managerList,
          },
        ])
        .then((res) => {
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
        });
    }
    // } else if (action === "Update Employee Role") {
    // }
  });
