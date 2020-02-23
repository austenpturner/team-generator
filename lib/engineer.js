const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {

        if (typeof name !== 'string') {
            throw new Error(`You did not enter a valid name.`);
        } else if (typeof id !== 'number' || isNaN(id) || id < 0) {
            throw new Error('Did not receive a valid id.')
        } else if (typeof email !== 'string') {
            throw new Error(`You did not enter a valid email.`);
        } else if (typeof github !== 'string') {
            throw new Error('Did not receive a valid GitHub.')
        } 
        
        super(name, id, email)
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;