const inquirer = require("inquirer");
const {
  viewDept,
  viewRole,
  viewEmployee,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./modules/inquirerQueries");
const {
  introQ,
  addDeptQ,
  addRoleQ,
  addEmployeeQ,
  updateEmpQ,
} = require("./modules/inquirerPrompts");

// Syntax below comes from documentation on 'Basic Promise' for mysql2: https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper

// Need to find a way to import department list from my DB

const myInquirer = () => {
  inquirer.prompt(introQ).then((res) => {
    const action = res.action;
    const whichOne = async () => {
      if (action === "View All Departments") {
        await viewDept();
      } else if (action === "View All Roles") {
        await viewRole();
      } else if (action === "View All Employees") {
        await viewEmployee();
      } else if (action === "Add A Department") {
        await inquirer.prompt(addDeptQ).then((res) => {
          addDepartment(res);
        });
      } else if (action === "Add A Role") {
        await inquirer.prompt(addRoleQ).then((res) => {
          addRole(res);
        });
      } else if (action === "Add An Employee") {
        await inquirer.prompt(addEmployeeQ).then((res) => {
          addEmployee(res);
        });
      } else if (action === "Update An Employee Role") {
        await inquirer.prompt(updateEmpQ).then((res) => {
          updateEmployeeRole(res);
        });
      }
    };
    whichOne().then((next) => myInquirer());
  });
};

myInquirer();
