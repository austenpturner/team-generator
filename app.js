const fs = require('fs');
const inquirer = require('../node_modules/inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let memberId = 0;
let managers = [];
let engineers = [];
let interns = [];
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
};

function newEngineer(name, id, email, github) {
    engineers.push(new Engineer(name, id, email, github));
};

function newIntern(name, id, email, school) {
    interns.push(new Intern(name, id, email, school));
};

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
};

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
};

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
};

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
            writeHTML(managers);
            writeHTML(engineers);
            writeHTML(interns);
            renderTeamHTML();
            console.log('Thank you for entering all your team members. A team profile has been generated.');
        }
    });
};

function writeHTML(memberArray) {
    memberArray.forEach( member => {
        const keys = Object.keys(member);
        const role = member.getRole();
        const values = Object.values(member);
        const cardHTML = `
            <div class="card">
                <h5 class="card-header">${values[0]}</h5>
                <div class="card-body">
                <h5 class="card-title">${role}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">ID: ${values[1]}</li>
                        <li class="list-group-item">Email: <a href=mailto:${values[2]}>${values[2]}</a></li>
                        <li class="list-group-item">${keys[3]}: ${values[3]}</li>
                    </ul>
                </div>
            </div>`
        cards.push(cardHTML);

    })
};

function renderTeamHTML() {
    let teamHTML = `
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
        teamHTML += card;
    })
    teamHTML += `
    </body>
    </html>
    `;

    fs.writeFile('trial.html', teamHTML, (err) => {
        if (err) {
            return err;
        }

        console.log('written to trial.html');
    })
}