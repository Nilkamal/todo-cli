#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const { firebase } = require("./config/firebase");

start();

async function start() {
  clear();
  console.log(
    chalk.red(figlet.textSync("TODO-CLI", { horizontalLayout: "full" }))
  );

  await inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: "Please enter your username",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your username";
          }
        }
      },
      {
        type: "password",
        name: "password",
        message: "Please enter your password",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password";
          }
        }
      }
    ])
    .then(answers => {
      console.log(answers);
      firebase
        .auth()
        .signInWithEmailAndPassword(answers.username, answers.password)
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(
            chalk.red(
              `Something went wrong. ${errorMessage}, error code: ${errorCode}`
            )
          );
        });
    });
  await inquirer
    .prompt([
      {
        type: "rawlist",
        name: "askForTodo",
        message: `Thanks for  logging in, would you like to enter your first Todo?`,
        choices: ["yes", "no"]
      }
    ])
    .then(answers => {
      if (answers.askForTodo === "yes") {
        console.log(chalk.green("Let's do this"));
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the name of this Todo?"
            },
            {
              type: "input",
              name: "deets",
              message: "Any further info you want  to add?"
            },
            {
              type: "input",
              name: "priority",
              message: "How urgent is this? (high, medium, low)?"
            }
          ])
          .then(answers => {
            firebase
              .firestore()
              .collection("Todo")
              .add({
                title: answers.title,
                moreDetails: answers.deets,
                priority: answers.priority
              });
          })
          .then(() => {
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "more",
                  message: "would you like to add another?",
                  choices: ["yes", "no"]
                }
              ])
              .then(answers => {
                if (answers.more === "yes") {
                  console.log(chalk.blue("Ask for more..."));
                } else {
                  console.log(chalk.blue("Bye"));
                }
              });
          });
      } else {
        console.log(chalk.blue("Bye"));
      }
    });
}
