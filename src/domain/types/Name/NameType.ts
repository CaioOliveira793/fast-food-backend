import { DomainType } from '@domainTypes/DomainType';


export class Name extends DomainType<string> {
	private value: string;

	constructor(fullName: string) {
		super();

		const uppercasedName = fullName.replace(/^(.)|\s+(.)/g, letter => letter.toUpperCase());

		const names = uppercasedName.split(' ');
		for (const name of names) {
			if (!name.match(/^[A-Z]/g))
				throw new Error(`The name ${name} does not start with a uppercase letter`);
		}

		this.value = uppercasedName;
	}

	public getValue(): string {
		return this.value;
	}
	public getFirstName(): string {
		return this.value.split(' ')[0];
	}
	public getLastName(): string {
		const names = this.value.split(' ');
		return names[names.length - 1];
	}

}
