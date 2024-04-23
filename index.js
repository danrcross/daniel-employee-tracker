const inquirer = require("inquirer");
const QueryMaker = require("./modules/main-fns");
const mysql = require("mysql2/promise");

// Syntax below comes from documentation on 'Basic Promise' for mysql2: https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
const db = (myQuery) => {
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
      return conn.query(myQuery);
    })
    // Some googling about getting a table as an output introduced me to the 'console.table' static method: https://developer.mozilla.org/en-US/docs/Web/API/console/table_static
    .then(([rows, fields]) => {
      return console.table(rows);
    });
};

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
        // "Add An Employee",
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
      db(myQuery);
    } else if (action === "View All Roles") {
      table = "role";
      myQuery = new QueryMaker(table).viewAll();
      db(myQuery);
    } else if (action === "View All Employees") {
      table = "employee";
      myQuery = new QueryMaker(table).viewAll();
      db(myQuery);
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
          const deptName = `'${res.department}'`;
          myQuery = new QueryMaker(table, "name", deptName).addItem();
          db(myQuery);
          db(`SELECT * FROM department`);
        });
    } else if (action === "Add A Role") {
      table = "role";
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
            choices: [
              "Human Resources",
              "Design",
              "Back-End",
              "Front-End",
              "Management",
              "Maintenance",
            ],
            filter: (input) => {
              return new Promise((resolve, reject) => {
                if (input === "Human Resources") {
                  resolve(1);
                } else if (input === "Design") {
                  resolve(2);
                } else if (input === "Back-End") {
                  resolve(3);
                } else if (input === "Front-End") {
                  resolve(4);
                } else if (input === "Management") {
                  resolve(5);
                } else if (input === "Maintenance") {
                  resolve(6);
                } else {
                  reject(new Error("Something has gone wrong..."));
                }
              });
            },
          },
          {
            type: "number",
            name: "salary",
            message: "What is the salary of this role?",
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
          db(myQuery);
        });
    }
    // else if (action === "Add An Employee") {

    // }
    // } else if (action === "View All Departments") {
    // }
  });
