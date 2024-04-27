// Import 'Queries' module; create new instance of class and destructure its methods for use in script
const Queries = require("./connectQuery");
const { deptList, salaryChecker, managerList, employeeList, roleList } =
  new Queries();

// Objects made of inquirer questions.
const introQ = [
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
      "Update An Employee Role",
      "Quit Application",
    ],
  },
];

const addDeptQ = [
  {
    type: "text",
    name: "department",
    message: "What is the name of the department?",
  },
];

const addRoleQ = [
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
    // Will produce array/list from which user can choose (imported from Queries module)
    choices: deptList,
  },
  {
    type: "number",
    name: "salary",
    message:
      "What is the salary of this role?\nSalary must adhere to following format: \n  1. No commas in number\n  2. May include 2 decimal places\n  3. Must be LESS THAN 21 digits WITH decimals OR LESS THAN 19 digits WITHOUT decimals\n",
    // Filter contains method from Queries that will check to make sure salary entry is valid
    filter: salaryChecker,
  },
];

const addEmployeeQ = [
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
    // Same as deptList (above)
    choices: roleList,
  },
  {
    type: "list",
    name: "manager_id",
    message: "What is the employee's manager's name?",
    // Same as deptList (above)
    choices: managerList,
  },
];

const updateEmpQ = [
  {
    type: "list",
    name: "employee",
    message: "Whose role would you like to update?",
    // Same as deptList (above)
    choices: employeeList,
  },
  {
    type: "list",
    name: "role",
    message: "What role would you like to assign to this employee?",
    // Same as deptList (above)
    choices: roleList,
  },
];

// Exports questions to be used by application (index.js)
module.exports = { introQ, addDeptQ, addRoleQ, addEmployeeQ, updateEmpQ };
