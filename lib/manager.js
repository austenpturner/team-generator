const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {

        if (typeof name !== 'string') {
            throw new Error(`You did not enter a valid name.`);
        } else if (typeof id !== 'number' || isNaN(id) || id < 0) {
            throw new Error('Did not receive a valid id.')
        } else if (typeof email !== 'string') {
            throw new Error(`You did not enter a valid email.`);
        } else if (typeof officeNumber !== 'number' || isNaN(officeNumber) || officeNumber < 0) {
            throw new Error('Did not receive a valid office number.')
        } 

        super(name, id, email)
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;