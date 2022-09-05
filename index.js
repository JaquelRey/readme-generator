// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const generateLicense = require('./utils/generateLicense')


//questions array included, many are optional unless truly needed
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your project?',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter a title for your project.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Give a short description of your project, and why you built it.',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You must enter a description for your project.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'features',
            message: 'Does this project have any special features? What are they?',
        },
        {
            type: 'input',
            name: 'technologies',
            message: 'What technologies did you use, and why?',
        },
        {
            type: 'input',
            name: 'dependancies',
            message: 'Does this project have any dependancies? What are they?',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'How should the project be installed?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How is the project run after installation is completed?',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Are there any tests included for your project? Give instructions to run them.',
        },
        {
            type: 'input',
            name: 'credits',
            message: 'Give credit to any resources you used.',
        },
        {
            type: 'input',
            name: 'authors',
            message: 'Give credit to anyone who worked on this project.',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log("You should at least give yourself some credit.");
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'How can other developers contribute to this project?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Pick a liscense for this project, if desired. For more information, visit https://choosealicense.com/',
            choices: ['MIT License', 'ISC License', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'The Unlicense']
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address.',
        },
    ]);
};

// async init 
async function init(){
    try {
        // inquirer questions
        const data = await promptUser();

        //section that gets selected license (if exists)
        //and then returns sheild.io badge to pass to md gen
        let badge

        if(data.license){
            badge = generateLiscense(data.license)
            generateMarkdown(data, badge)
        } else {
            generateMarkdown(data, badge)    
        }

        console.log("Responses recieved....");

    } catch(error) {
        console.log(error);
    }
};

init();
