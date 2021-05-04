import { Name } from './NameType';


describe('Name type', () => {

	it('create a new Name from lower case', () => {
		const name = new Name('lower case name');

		expect(name.getValue()).toBe('Lower Case Name');
		expect(name.getFirstName()).toBe('Lower');
		expect(name.getLastName()).toBe('Name');
	});

	it('create a new Name from upper case', () => {
		const name = new Name('Upper Case');

		expect(name.getValue()).toBe('Upper Case');
		expect(name.getFirstName()).toBe('Upper');
		expect(name.getLastName()).toBe('Case');
	});

	it('throw an Error when create from a invalid name', () => {
		const invalidName = 'not , Upper * Case';
		expect(() => new Name(invalidName))
			.toThrowError(new Error('The name , does not start with a uppercase letter'));
	});

});
