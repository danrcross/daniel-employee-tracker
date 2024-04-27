// Import inquirer npm package, Queries module, inquirer questions from 'inquirerPrompts' module
const inquirer = require("inquirer");
const Queries = require("./modules/connectQuery");
const {
  introQ,
  addDeptQ,
  addRoleQ,
  addEmployeeQ,
  updateEmpQ,
  updateEmpManagerQ,
} = require("./modules/inquirerPrompts");

// Destructures methods from Queries module to be used by app
const {
  viewDept,
  viewRole,
  viewEmployee,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  endConnection,
} = new Queries();

// MAIN APP SCRIPT: An inquirer prompt that will be run in terminal with Node.js; will ask user what they would like to do
// Incorporates methods from modules included in app.
const myInquirer = () => {
  inquirer.prompt(introQ).then((res) => {
    // User response to initial question produces an object containing 'action' property, with value equivalent to choice selected by user
    // Stores this value into const 'action'
    const action = res.action;
    // Fn will check user's response, and execute method from 'Queries' that corresponds to desired action
    // Some user responses will initiate further inquirer prompts, and the response from that prompt will be passed as argument into a 'Queries' method
    const whichOne = async () => {
      if (action === "View All Departments") {
        await viewDept();
      } else if (action === "View All Roles") {
        await viewRole();
      } else if (action === "View All Employees") {
        await viewEmployee();
      } else if (action === "Add A Department") {
        await inquirer.prompt(addDeptQ).then(async (res) => {
          await addDepartment(res);
        });
      } else if (action === "Add A Role") {
        await inquirer.prompt(addRoleQ).then(async (res) => {
          await addRole(res);
        });
      } else if (action === "Add An Employee") {
        await inquirer.prompt(addEmployeeQ).then(async (res) => {
          await addEmployee(res);
        });
      } else if (action === "Update An Employee Role") {
        await inquirer.prompt(updateEmpQ).then(async (res) => {
          await updateEmployeeRole(res);
        });
      } else if (action === "Update An Employee's Manager") {
        await inquirer.prompt(updateEmpManagerQ).then(async (res) => {
          await updateEmployeeManager(res);
        });
      } else if (action === "Quit Application") {
        await endConnection();
      }
    };
    // If the user chooses 'Quit Application', the application ends. Otherwise, the application is restarted and user may choose another action.
    whichOne().then((next) => {
      if (action === "Quit Application") {
        return;
      } else {
        myInquirer();
      }
    });
  });
};

// initializes the application
myInquirer();
