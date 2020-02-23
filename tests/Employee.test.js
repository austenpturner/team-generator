const Employee = require('../lib/employee');

describe('Employee', () => {
    describe('Initialization', () => {
        it('should create a new object instance with a name, id and email if provided valid arguments', () => {
            const employee = new Employee('Jane', 1, 'jane@gmail.com');

            expect(employee.getName()).toEqual('Jane');
            expect(employee.getId()).toEqual(1);
            expect(employee.getEmail()).toEqual('jane@gmail.com');
            expect(employee.getRole()).toEqual('Employee');
        });
        it('should throw an error if provided no arguments', () => {
            const cb = () => new Employee();
      
            expect(cb).toThrow();
        });
        it('should throw an error if name is not a string', () => {
            const cb = () => new Employee(1, 1, 'jane@gmail.com');
            const err = new Error(`You did not enter a valid name.`);
      
            expect(cb).toThrowError(err);
        });
        it('should throw an error if id is not a number', () => {
            const cb = () => new Employee('Jane', '1', 'jane@gmail.com');
            const err = new Error('Did not receive a valid id.');
      
            expect(cb).toThrowError(err);
        });
        it('should throw an error if email is not a string', () => {
            const cb = () => new Employee('Jane', 1, 1);
            const err = new Error(`You did not enter a valid email.`);
      
            expect(cb).toThrowError(err);
        });
    });
});

