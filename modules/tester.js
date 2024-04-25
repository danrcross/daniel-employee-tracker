const GetList = require("./GetList");
const mysql = require("mysql2/promise");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "asdf",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);
const makeMyList = () => {
  const thisList = new GetList("SELECT * FROM department");
  const myList = () => thisList.createDepartmentList(db);
  myList();
};

makeMyList();

// const getIt = async () => {
//   try {
//     const myArray = await makeMyList();
//     console.log(myArray);
//   } catch (error) {
//     console.error("messed up 2", error);
//   }
// };

// getIt();
