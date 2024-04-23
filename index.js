const inquirer = require("inquirer");
const QueryMaker = require("./modules/main-fns");
const mysql = require("mysql2/promise");
const arrtotable = require("array-to-table");

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
        // "Add A Department",
        // "Add A Role",
        // "Add An Employee",
        // "Update An Employee Role",
      ],
    },
  ])
  .then((res) => {
    const action = res.action;
    let table = "";
    if (action === "View All Departments") {
      table = "department";
    } else if (action === "View All Roles") {
      table = "role";
    } else if (action === "View All Employees") {
      table = "employee";
    }
    // } else if (action === "View All Departments") {
    // } else if (action === "View All Departments") {
    // } else if (action === "View All Departments") {
    // } else if (action === "View All Departments") {
    // }
    db(table);
  });

// Syntax below comes from documentation on 'Basic Promise': https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
// will become a function inside of inquirer prompts
const db = (table) =>
  mysql
    .createConnection(
      {
        host: "localhost",
        user: "root",
        password: "asdf",
        database: "company_db",
      },
      console.log(`Connected to the company_db database.`)
    )
    .then((conn) => {
      const myQuery = new QueryMaker(table).viewAll();
      return conn.query(myQuery);
    })
    // Some googling about getting a table as an output introduced me to the 'console.table' static method: https://developer.mozilla.org/en-US/docs/Web/API/console/table_static
    .then(([rows, fields]) => console.table(rows));
