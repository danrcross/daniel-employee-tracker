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
  whichManQ,
  whichDepQ,
  deleteWhat,
  deleteDeptQ,
  deleteRoleQ,
  deleteEmployeeQ,
  whichBudget,
} = require("./modules/inquirerPrompts");

// Destructures methods from Queries module to be used by app
const {
  viewDept,
  viewRole,
  viewEmployee,
  viewEmployeeByM,
  viewEmployeeByD,
  viewBudgetByD,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
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
      } else if (action === "View Employees By Manager") {
        await inquirer.prompt(whichManQ).then(async (res) => {
          await viewEmployeeByM(res);
        });
      } else if (action === "View Employees By Department") {
        await inquirer.prompt(whichDepQ).then(async (res) => {
          await viewEmployeeByD(res);
        });
      } else if (action === "View Utilized Budget By Department") {
        await inquirer.prompt(whichBudget).then(async (res) => {
          await viewBudgetByD(res);
        });
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
      } else if (action === "Delete A Department, Role, Or Employee") {
        await inquirer.prompt(deleteWhat).then(async (res) => {
          if (res.table === "department") {
            await inquirer.prompt(deleteDeptQ).then(async (res) => {
              await deleteDepartment(res);
            });
          }
          if (res.table === "role") {
            await inquirer.prompt(deleteRoleQ).then(async (res) => {
              await deleteRole(res);
            });
          }
          if (res.table === "employee") {
            await inquirer.prompt(deleteEmployeeQ).then(async (res) => {
              await deleteEmployee(res);
            });
          }
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
