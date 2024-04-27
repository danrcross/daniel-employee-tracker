// Import 'Queries' module; create new instance of class and destructure its methods for use in script
const Queries = require("./connectQuery");
const {
  deptList,
  salaryChecker,
  managerList,
  employeeList,
  roleList,
  employeeMList,
  tableList,
} = new Queries();

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
      "View Employees By Manager",
      "View Employees By Department",
      "View Utilized Budget By Department",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
      "Update An Employee's Manager",
      "Delete A Department, Role, Or Employee",
      "Quit Application",
    ],
  },
];

const whichManQ = [
  {
    type: "list",
    name: "manager",
    message: "Which manager's employees would you like to view?",
    choices: managerList,
  },
];
const whichDepQ = [
  {
    type: "list",
    name: "department",
    message: "Which department's employees would you like to view?",
    choices: deptList,
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
    message: "Whose role would you like to update?\n EMPLOYEE: CURRENT ROLE",
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

const updateEmpManagerQ = [
  {
    type: "list",
    name: "employee",
    message:
      "Whose manager would you like to update?\n EMPLOYEE: CURRENT MANAGER",
    // Same as deptList (above)
    choices: employeeMList,
  },
  {
    type: "list",
    name: "manager",
    message: "Which manager would you like to assign to this employee?",
    // Same as deptList (above)
    choices: managerList,
  },
];

const deleteWhat = [
  {
    type: "list",
    name: "table",
    message: "Which table would you like to delete an item from?",
    choices: tableList,
  },
];

const deleteDeptQ = [
  {
    type: "list",
    name: "department",
    message: "Which department would you like to delete?",
    choices: deptList,
  },
];
const deleteRoleQ = [
  {
    type: "list",
    name: "role",
    message: "Which role would you like to delete?",
    choices: roleList,
  },
];
const deleteEmployeeQ = [
  {
    type: "list",
    name: "employee",
    message: "Which employee would you like to delete?",
    choices: employeeList,
  },
];

const whichBudget = [
  {
    type: "list",
    name: "department",
    message: "Which department's budget would you like to view?",
    choices: deptList,
  },
];

// Exports questions to be used by application (index.js)
module.exports = {
  introQ,
  addDeptQ,
  addRoleQ,
  addEmployeeQ,
  updateEmpQ,
  updateEmpManagerQ,
  whichManQ,
  whichDepQ,
  deleteWhat,
  deleteDeptQ,
  deleteRoleQ,
  deleteEmployeeQ,
  whichBudget,
};
