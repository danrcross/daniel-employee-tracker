const QueryMaker = require("./main-fns");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

const myQuery = new QueryMaker("department").viewAll();

const getList = new Promise((resolve, reject) => {
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
      if (!rows) {
        reject("No data found here");
      } else {
        resolve(rows);
      }
    });
});
// create a loop
const deptList = getList
  .then((table) => [
    table[0].name,
    table[1].name,
    table[2].name,
    table[3].name,
    table[4].name,
    table[5].name,
  ])
  .then((names) => console.log(names));
