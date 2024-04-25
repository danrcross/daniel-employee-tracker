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
  async createRoleList(db) {
    let roles = [];
    await db
      .then((conn) => conn.query(this.query))
      .then(([rows, fields]) => {
        roles = rows.map((item) => {
          // This post on stack exchange helped me to understand what kind of data inquirer was looking in the choices property.
          // Inquirer got mad whenever I tried to use a function that would produce an array of strings. it wanted an array of key-value pairs, name and value.
          // https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
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
        conn.query(
          "SELECT DISTINCT e2.first_name, e2.last_name, e2.id FROM employee e1 JOIN employee e2 ON e1.manager_id = e2.id;"
        )
      )
      .then(([rows, fields]) => {
        managers = rows.map((item) => {
          return {
            name: item.first_name + " " + item.last_name,
            value: item.id,
          };
        });
      });
    this.data = managers;
  }
}

module.exports = GetList;
