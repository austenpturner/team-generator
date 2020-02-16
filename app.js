const fs = require('fs');
const inquirer = require('../node_modules/inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let memberId = 0;
let managers = [];
let engineers = [];
let interns = [];

inquireMember();

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
    })
}

function newManager(name, id, email, officeNumber) {
    managers.push(new Manager(name, id, email, officeNumber));
    // console.log(managers);
}

function newEngineer(name, id, email, github) {
    engineers.push(new Engineer(name, id, email, github));
    // console.log(engineers);
}

function newIntern(name, id, email, school) {
    interns.push(new Intern(name, id, email, school));
    // console.log(interns);
}

function inquireManager(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter manager office number:',
            name: 'number'
        }
    ]).then(( {number} ) => {
        const officeNumber = parseInt(number);
        newManager(name, memberId, email, officeNumber);
    }).then(() => {
        inquireAgain();
    });
}

function inquireEngineer(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter engineer GitHub username:',
            name: 'github'
        }
    ]).then(( {github} ) => {
        newEngineer(name, memberId, email, github);
    }).then(() => {
        inquireAgain();
    });
}

function inquireIntern(name, memberId, email) {
    inquirer.prompt([
        {
            message: 'Enter intern\'s school:',
            name: 'school'
        }
    ]).then(( {school} ) => {
        newIntern(name, memberId, email, school);
    }).then(() => {
        inquireAgain();
    });
}

function inquireAgain() {
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
    });
};