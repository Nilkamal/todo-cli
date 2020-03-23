#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("inquirer");
const {
  firebase
} = require("./config/firebase");

const log = console.log;
const text = figlet.textSync;

start();

async function start() {
  clear();
  log(
    chalk.red(text("TODO-CLI", {
      horizontalLayout: 'full'
    }))
  );

  try {

    const userInfo = await askUserInfo();
    const authentication = await firebase.auth().signInWithEmailAndPassword(userInfo.username, userInfo.password);
    if (authentication) {

      const saveTodo = async ({title, deets, priority}) => {
        console.log(title, deets, priority)
        return await firebase
          .firestore()
          .collection("Todo")
          .add({
            title: title,
            moreDetails: deets,
            priority: priority
          });
      };

      const todo = async () => {
        return await inquirer
          .prompt([{
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
      };

      const todoChoice = async () => {
        return await inquirer
          .prompt([{
            type: "list",
            name: "askForTodo",
            message: `Thanks for  logging in, would you like to enter your Todo?`,
            choices: ["yes", "no"]
          }])
      }
      console.log('Choice');
      let choiceAnswer = await todoChoice();
      console.log('choice end')
      console.log(choiceAnswer);
      while(choiceAnswer.askForTodo === "yes") {
        const todoAnswer = await todo();
        const response = await saveTodo(todoAnswer);
        choiceAnswer = await todoChoice();
      }


    }
  } catch (error) {
    console.log(
      chalk.red(
        `Something went wrong. ${error.message}, error code: ${error.code}`
      )
    );
  }
};

async function askUserInfo() {
  return await inquirer
    .prompt([{
        type: "input",
        name: "username",
        message: "Please enter your username",
        validate: function (value) {
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
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your password";
          }
        }
      }
    ]);
}