const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
const generateLicense = require('./utils/generateLicense');
// const licenseMarkdown = require('./utils/licenseMarkdown')




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
            message: 'Pick a license for this project, if desired. For more information, visit https://choosealicense.com/ ....',
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
        }
        /*{   for future development
            type: 'confirm',
             name: 'licensemd',
            message: 'Would you like to generate an additional .md of your selected license?',
         },*/
    ]);
};

/*   for future development

function licenseQuestion(license){

    //called during the README generation process if user has selected a license
    console.log("You've selected to generate an additional file: license.md");
    console.log("If you'd like the license.md to include your name instead of a placeholder, answer this prompt.");

    return inquirer.prompt([
        {
            type: 'input',
            name: 'fullname',
            message: 'What\'s your full name?',
        }
    ]);
} */


// async init 
async function init() {
    try {
        // await response from inquirer questions
        const data = await promptUser();
        const license = data.license
        const filename = (data.title).split(' ').join('-')

        console.log("Responses recieved....");

        //if user has chosen to use a license:
        //get selected license and pass to generateLicense
        //return shield.io badge
        let badge

        if (license) {
            console.log("Creating " + filename + ".md....");
            badge = generateLicense(license);
            let finalMd = generateMarkdown(data, badge);

            fs.writeFile("./created/" + filename + ".md", finalMd, function (error) {
                if (error) throw error;
                console.log("Success!");
            });

            /* for future development (generates complete license file)

            //if with a nested async await, nested in an if else inside of an async await.......

            if (data.licensemd === true){
                async function init2(){
                    try {
                        //grabbing the current year to add to license

                        const year = new Date().getFullYear();
                        
                        //if user elects to generate a license.md, prompt user for their name (optional)

                        const answer = await licenseQuestion(); 
                        const chosenMd = licenseMarkdown(license, answer, year);

                        //call licenseMarkdown, which passes back md
                        //license md is saved as a seperate file in same directory as README
                        
                    } catch (error) {
                        console.log("Can\'t generate license.md : " + error);
                    }
                    init2();
                }
            }*/

        } else {

            let finalMd = generateMarkdown(data);
            console.log("Creating " + filename + ".md....");

            fs.writeFile("./created/" + filename + ".md", finalMd, function (error) {
                if (error) throw error;
                console.log("Success!");
            });
        }
    } catch (error) {
        console.log("Can\'t generate README.md : " + error);
    }
};

init();
