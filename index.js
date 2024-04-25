const inquirer = require("inquirer");
const {
  viewDept,
  viewRole,
  viewEmployee,
  addDepartment,
  deptList,
  addRole,
  salaryChecker,
  roleList,
  managerList,
  addEmployee,
  employeeList,
  updateEmployeeRole,
} = require("./modules/inquirerHelpers");

// Syntax below comes from documentation on 'Basic Promise' for mysql2: https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper

// Need to find a way to import department list from my DB

const myInquirer = () => {
  inquirer
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
          "Update An Employee Role",
        ],
      },
    ])
    .then((res) => {
      const action = res.action;
      if (action === "View All Departments") {
        viewDept();
      } else if (action === "View All Roles") {
        viewRole();
      } else if (action === "View All Employees") {
        viewEmployee();
      } else if (action === "Add A Department") {
        inquirer
          .prompt([
            {
              type: "text",
              name: "department",
              message: "What is the name of the department?",
            },
          ])
          .then((res) => {
            addDepartment(res);
          });
      } else if (action === "Add A Role") {
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
              filter: salaryChecker,
            },
          ])
          .then((res) => {
            addRole(res);
          });
      } else if (action === "Add An Employee") {
        table = "employee";
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
            addEmployee(res);
          });
      } else if (action === "Update An Employee Role") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee",
              message: "Whose role would you like to update?",
              choices: employeeList,
            },
            {
              type: "list",
              name: "role",
              message: "What role would you like to assign to this employee?",
              choices: roleList,
            },
          ])
          .then((res) => {
            updateEmployeeRole(res);
          });
      }
    }).then((res)=);
};

myInquirer();
