const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const path = require("path");
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const writeHTML = require('./lib/writeHTML');

const PORT = 9000;
const app = express();

// app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
    inquireMember();
});

let memberId = 0;
let managers = [];
let engineers = [];
let interns = [];
let teamMembers = [];
let cards = [];

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
    });
};

function newManager(name, id, email, officeNumber) {
    managers.push(new Manager(name, id, email, officeNumber));
    teamMembers.push(managers);
};

function newEngineer(name, id, email, github) {
    engineers.push(new Engineer(name, id, email, github));
    teamMembers.push(engineers);
};

function newIntern(name, id, email, school) {
    interns.push(new Intern(name, id, email, school));
    teamMembers.push(interns);
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
            for (let memberType of teamMembers) {
                writeHTML(memberType);
            }
            renderTeamHTML();
            console.log('Thank you for entering all your team members. A team profile has been generated.');
        }
    });
};

function writeHTML(memberArray) {
    memberArray.forEach( member => {
        const role = member.getRole();
        let specificVal;
        let specificKey;
        if (role === 'Manager') {
            specificKey = 'Office Number';
            specificVal = member.getOfficeNumber();
        } else if (role === 'Engineer') {
            specificKey = 'GitHub';
            specificVal = member.getGithub();
        } else {
            specificKey = 'School';
            specificVal = member.getSchool();
        }
        const cardHTML = `
            <div class="card">
                <h5 class="card-header">${member.name}</h5>
                <div class="card-body">
                <h5 class="card-title">${role}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${member.id}</li>
                        <li class="list-group-item">Email: <a href=mailto:${member.email}>${member.email}</a></li>
                        <li class="list-group-item">${specificKey}: ${specificVal}</li>
                    </ul>
                </div>
            </div>`

        cards.push(cardHTML);
    })
};

function renderTeamHTML() {
    let mainHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
    
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
    `;
    cards.forEach( card => {
        mainHTML += card;
    })
    mainHTML += `
    </body>
    </html>
    `;

    fs.appendFile('./templates/main.html', mainHTML, (err) => {
        if (err) {
            return err;
        }

        console.log('written to main.html');
    })
}

