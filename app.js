const fs = require('fs');
const inquirer = require('../node_modules/inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let memberId = 0;
let managers = [];
let engineers = [];
let interns = [];

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
            inquirer.prompt([
                {
                    message: 'Enter manager office number:',
                    name: 'number'
                }
            ]).then(( {number} ) => {
                const officeNumber = parseInt(number);
                newManager(name, memberId, email, officeNumber);
            }).then(() => {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: 'Enter another team member?',
                        name: 'moreMembers'
                    }
                ]).then(( { moreMembers }) => {
                    if (moreMembers) {
                        inquireMember();
                    } else {
                        console.log('Thank you for entering all your team members. A team profile has been generated.');
                    }
                })
            })
        } else if (position === 'Engineer') {
            inquirer.prompt([
                {
                    message: 'Enter engineer GitHub username:',
                    name: 'github'
                }
            ]).then(( {github} ) => {
                newEngineer(name, memberId, email, github);
            }).then(() => {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: 'Enter another team member?',
                        name: 'moreMembers'
                    }
                ]).then(( { moreMembers }) => {
                    if (moreMembers) {
                        inquireMember();
                    } else {
                        console.log('Thank you for entering all your team members. A team profile has been generated.');
                    }
                })
            })
        } else {
            inquirer.prompt([
                {
                    message: 'Enter intern\'s school:',
                    name: 'school'
                }
            ]).then(( {school} ) => {
                newIntern(name, memberId, email, school);
            }).then(() => {
                inquirer.prompt([
                    {
                        type: 'confirm',
                        message: 'Enter another team member?',
                        name: 'moreMembers'
                    }
                ]).then(( { moreMembers }) => {
                    if (moreMembers) {
                        inquireMember();
                    } else {
                        console.log('Thank you for entering all your team members. A team profile has been generated.');
                    }
                })
            })
        }
    })
}

inquireMember();

function newManager(name, id, email, officeNumber) {
    const teamManager = new Manager(name, id, email, officeNumber);
    console.log(teamManager);
}

function newEngineer(name, id, email, github) {
    const engineer1 = new Engineer(name, id, email, github);
    console.log(engineer1);
}

function newIntern(name, id, email, school) {
    const intern1 = new Intern(name, id, email, school);
    console.log(intern1);
}