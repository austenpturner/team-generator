const Intern = require('../lib/intern');

describe('Intern', () => {
    describe('Initialization', () => {
        it('should create a new object instance with a name, id, email and school if provided valid arguments', () => {
            const intern = new Intern('Jane', 1, 'jane@gmail.com', 'University of Washington');

            expect(intern.getName()).toEqual('Jane');
            expect(intern.getId()).toEqual(1);
            expect(intern.getEmail()).toEqual('jane@gmail.com');
            expect(intern.getSchool()).toEqual('University of Washington');
            expect(intern.getRole()).toEqual('Intern');
        });
    });
    it('should throw an error if provided no arguments', () => {
        const cb = () => new Intern();
  
        expect(cb).toThrow();
    });
    it('should throw an error if name is not a string', () => {
        const cb = () => new Intern(1, 1, 'jane@gmail.com', 'University of Washington');
        const err = new Error(`You did not enter a valid name.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if id is not a number', () => {
        const cb = () => new Intern('Jane', '1', 'jane@gmail.com', 'University of Washington');
        const err = new Error('Did not receive a valid id.');
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if email is not a string', () => {
        const cb = () => new Intern('Jane', 1, 1, 'University of Washington');
        const err = new Error(`You did not enter a valid email.`);
  
        expect(cb).toThrowError(err);
    });
    it('should throw an error if school is not a string', () => {
        const cb = () => new Intern('Jane', 1, 'jane@gmail.com', 1);
        const err = new Error('Did not receive a valid school.');
  
        expect(cb).toThrowError(err);
    });
});