import { v4 as uuidv4 } from 'uuid';

import { DomainType } from '@domainTypes/DomainType';

export class Id extends DomainType<string> {
	private value: string;

	public static readonly validationRegex =
		/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

	constructor(id?: string) {
		super();

		if (id) {
			if (!id.match(Id.validationRegex))
				throw new Error(`The id ${id} is a invalid uuid v4`);

			this.value = id;
		} else {
			this.value = uuidv4();
		}
	}

	public getValue(): string {
		return this.value;
	}
}
