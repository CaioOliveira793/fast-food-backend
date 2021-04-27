import { internet } from 'faker';

import { Email } from '@domainTypes/Email';


describe('Email type', () => {

	it('create a new Email', () => {
		const email = internet.email();
		const validEmail = new Email(email);

		expect(validEmail.getValue()).toBe(email);
	});

	it('throw an Error when create with an invalid email', () => {
		const invalidEmail = '@.inv@lid.email';

		expect(() =>new Email(invalidEmail))
			.toThrowError(new Error(`The email ${invalidEmail} is not valid`));
	});

});
