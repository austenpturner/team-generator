const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    describe('Initialization', () => {
        it('should create a new object instance with a name, id, email and GitHub if provided valid arguments', () => {
            const engineer = new Engineer('Jane', 1, 'jane@gmail.com', 'jdev');

            expect(engineer.getName()).toEqual('Jane');
            expect(engineer.getId()).toEqual(1);
            expect(engineer.getEmail()).toEqual('jane@gmail.com');
            expect(engineer.getGithub()).toEqual('jdev');
            expect(engineer.getRole()).toEqual('Engineer');
        });
    });
    it('should throw an error if provided no arguments', () => {
        const cb = () => new Engineer();
  
        expect(cb).toThrow();
    });
    it('should throw an error if name is not a string', () => {
        const cb = () => new Engineer(1, 1, 'jane@gmail.com', 'jdev');
        const err = new Error(`You did not enter a valid name.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if id is not a number', () => {
        const cb = () => new Engineer('Jane', '1', 'jane@gmail.com', 'jdev');
        const err = new Error('Did not receive a valid id.');
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if email is not a string', () => {
        const cb = () => new Engineer('Jane', 1, 1, 'jdev');
        const err = new Error(`You did not enter a valid email.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if GitHub is not a string', () => {
        const cb = () => new Engineer('Jane', 1, 'jane@gmail.com', 1);
        const err = new Error('Did not receive a valid GitHub.');
  
        expect(cb).toThrowError(err);
    });
});