// Require Node Modules
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

// Require JS Classes
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const renderTeamHTML = require('./lib/writeHTML');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
};

// Variables
let memberId = 0;
let teamMembers = [];

// Start CLI App
inquireMember();

// Functions
function inquireMember() {
    memberId++;
    inquirer.prompt([
        {
            message: `Enter name of team member #${memberId}:`,
            name: 'name'
        },
        {
            type: 'list',
            message: 'Enter team member position:',
            name: 'position',
            choices: [
                'Manager',
                'Engineer',
                'Intern'
            ]
        },
        {
            message: 'Enter team member email:',
            name: 'email'
        }
    ]).then(( {name, position, email} ) => {
        if (position === 'Manager') {
            inquireManager(name, memberId, email);
        } else if (position === 'Engineer') {
            inquireEngineer(name, memberId, email);
        } else {
            inquireIntern(name, memberId, email);
        }
    });
};

function newManager(name, id, email, officeNumber) {
    teamMembers.push(new Manager(name, id, email, officeNumber));
};

function newEngineer(name, id, email, github) {
    teamMembers.push(new Engineer(name, id, email, github));
};

function newIntern(name, id, email, school) {
    teamMembers.push(new Intern(name, id, email, school));
};

function inquireManager(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter manager\'s office number:',
            name: 'number'
        }
    ]).then(( {number} ) => {
        const officeNumber = parseInt(number);
        newManager(name, memberId, email, officeNumber);
        inquireAgain();
    });
};

function inquireEngineer(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter engineer\'s GitHub username:',
            name: 'github'
        }
    ]).then(( {github} ) => {
        newEngineer(name, memberId, email, github);
        inquireAgain();
    });
};

function inquireIntern(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter intern\'s school:',
            name: 'school'
        }
    ]).then(( {school} ) => {
        newIntern(name, memberId, email, school);
        inquireAgain();
    });
};

function inquireAgain() {
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Enter another team member?',
            name: 'moreMembers'
        }
    ]).then(( {moreMembers} ) => {
        if (moreMembers) {
            inquireMember();
        } else {
            const teamHTML = renderTeamHTML(teamMembers);
            writeTeamHTML(teamHTML);

            console.log('Thank you for entering your team members. A team profile is being generated....');
        }
    });
};

function writeTeamHTML(html) {
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            return err;
        }
    
        console.log('Team profiled generated and written to team.html in the output file.\r\nOpen team.html in a web browser to view your team profile.');
    })
};