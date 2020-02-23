class Employee {
    constructor(name, id, email) {

        if (typeof name !== 'string') {
            throw new Error(`You did not enter a valid name.`);
        } else if (typeof id !== 'number' || isNaN(id) || id < 0) {
            throw new Error('Did not receive a valid id.')
        } else if (typeof email !== 'string') {
            throw new Error(`You did not enter a valid email.`);
        }

        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }  
}

module.exports = Employee;


