const mysql = require("mysql2/promise");

// Got help from Xpert Learning Assistant to pass data from function into class property,
// as well as with helping me to understand and use asynchonous 'async/await' syntax (covered also in module 13.1)
class GetList {
  constructor(query) {
    this.query = query;
    this.data = null;
  }
  async createDepartmentList(db) {
    let names = [];
    await db
      .then((conn) => conn.query(this.query))
      .then(([rows, fields]) => {
        names = rows.map((item) => {
          // This post on stack exchange helped me to understand what kind of data inquirer was looking in the choices property.
          // Inquirer got mad whenever I tried to use a function that would produce an array of strings. it wanted an array of key-value pairs, name and value.
          // https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
          return { name: item.name, value: item.id };
        });
      });
    this.data = names;
  }
}

module.exports = GetList;
