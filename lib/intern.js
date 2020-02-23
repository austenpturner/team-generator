const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school) {

        if (typeof name !== 'string') {
            throw new Error(`You did not enter a valid name.`);
        } else if (typeof id !== 'number' || isNaN(id) || id < 0) {
            throw new Error('Did not receive a valid id.')
        } else if (typeof email !== 'string') {
            throw new Error(`You did not enter a valid email.`);
        } else if (typeof school !== 'string') {
            throw new Error('Did not receive a valid school.')
        } 

        super(name, id, email)
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;