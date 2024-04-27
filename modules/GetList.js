// Import 'mysql' npm package
const mysql = require("mysql2/promise");

// Got help from Xpert Learning Assistant to pass data from function into class property,
// as well as with helping me to understand and use asynchonous 'async/await' syntax (covered also in module 13.1)
class GetList {
  constructor(query) {
    this.query = query;
    this.data = null;
  }

  // an asynchronous function that will:
  // 1. pull a table from the database
  // 2. map through that array of data and return a new array that contains key-value pairs that hold that data, in the proper format to be read by inquirer
  // 3. assigns that new array 'depts' to the 'this.data' property of the class constructor
  // When an instance of this class is created and this function called on it, it will pass that array to the 'data' property of that instance.
  // For example: create myInstance --> myInstance.createDepartmentList(db) called --> myInstance.data will be the array that was created
  async createDepartmentList(db) {
    let depts = [];
    await db
      .then((conn) => conn.query(this.query))
      .then(([rows, fields]) => {
        depts = rows.map((item) => {
          // This post on stack exchange helped me to understand what kind of data inquirer was looking in the choices property.
          // Inquirer got mad whenever I tried to use a function that would produce an array of strings. it wanted an array of key-value pairs, name and value.
          // https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
          return { name: item.name, value: item.id };
        });
      });
    // 'depts' array passed up to 'this.data'
    this.data = depts;
  }

  // Works in very similar fashion to function above!
  async createRoleList(db) {
    let roles = [];
    await db
      .then((conn) => conn.query(this.query))
      .then(([rows, fields]) => {
        roles = rows.map((item) => {
          return { name: item.title, value: item.id };
        });
      });
    // 'names' array passed up to 'this.data'
    this.data = roles;
  }

  async createManagerList(db) {
    let managers = [];
    await db
      .then((conn) =>
        // Query joins employee table to itself at the match between manager id and employee id.
        // Also selects DISTINCT matches, as there are many repetitions of the manager_id (there are only 2 managers)
        // This will result in a small table showing the managers' first_name, last_name, and (employee) id.
        conn.query(
          "SELECT DISTINCT e2.first_name, e2.last_name, e2.id FROM employee e1 JOIN employee e2 ON e1.manager_id = e2.id;"
        )
      )
      .then(([rows, fields]) => {
        managers = rows.map((item) => {
          // Will format the result from the table as list items like: "First Last: Id"
          return {
            name: item.first_name + " " + item.last_name,
            value: item.id,
          };
        });
      });
    this.data = managers;
  }

  // Also works in very similar fashion to the first and second functions.
  async createEmployeeList(db) {
    let employees = [];
    await db
      .then((conn) =>
        // Query will join role table onto employee table where the role_id on employee table matches the id from role table
        // Resulting table will display employee id, followed by first name, last name, and role title
        conn.query(
          "SELECT e.id, e.first_name, e.last_name, r.title FROM employee e JOIN role r ON e.role_id= r.id"
        )
      )
      .then(([rows, fields]) => {
        employees = rows.map((item) => {
          // Will format the resulting table as a list items like : "First Last: Role"
          return {
            name: item.first_name + " " + item.last_name + ": " + item.title,
            value: item.id,
          };
        });
      });
    this.data = employees;
  }
}

// exports GetList class in order for its methods to be used by other scripts
module.exports = GetList;
