import { v4 as uuidv4 } from 'uuid';

import { Id } from '@domainTypes/Id';

describe('Id type', () => {

	it('create a new Id', () => {
		const id = new Id;

		expect(id.getValue()).toMatch(Id.validationRegex);
	});

	it('create a new id from uuid v4', () => {
		const uuid = uuidv4();
		const id = new Id(uuid);

		expect(id.getValue()).toBe(uuid);
	});

	it('throw an error when create the Id from a invalid uuid', () => {
		const invalidUuidv4 = 'cb3b5c32-f791-72d2-8667-5d0c66a8190cZ';

		expect(() => new Id(invalidUuidv4))
			.toThrowError(new Error(`The id ${invalidUuidv4} is a invalid uuid v4`));
	});

});
