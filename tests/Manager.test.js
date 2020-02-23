const Manager = require('../lib/manager');

describe('Manager', () => {
    describe('Initialization', () => {
        it('should create a new object instance with a name, id, email and office number if provided valid arguments', () => {
            const manager = new Manager('Jane', 1, 'jane@gmail.com', 1);

            expect(manager.getName()).toEqual('Jane');
            expect(manager.getId()).toEqual(1);
            expect(manager.getEmail()).toEqual('jane@gmail.com');
            expect(manager.getOfficeNumber()).toEqual(1);
            expect(manager.getRole()).toEqual('Manager');
        });
    });
    it('should throw an error if provided no arguments', () => {
        const cb = () => new Manager();
  
        expect(cb).toThrow();
    });
    it('should throw an error if name is not a string', () => {
        const cb = () => new Manager(1, 1, 'jane@gmail.com', 1);
        const err = new Error(`You did not enter a valid name.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if id is not a number', () => {
        const cb = () => new Manager('Jane', '1', 'jane@gmail.com', 1);
        const err = new Error('Did not receive a valid id.');
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if email is not a string', () => {
        const cb = () => new Manager('Jane', 1, 1, 1);
        const err = new Error(`You did not enter a valid email.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if office number is not a number', () => {
        const cb = () => new Manager('Jane', 1, 'jane@gmail.com', '1');
        const err = new Error('Did not receive a valid office number.');
  
        expect(cb).toThrowError(err);
    });
});