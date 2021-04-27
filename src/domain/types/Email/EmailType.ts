import { DomainType } from '@domainTypes/DomainType';


export class Email extends DomainType<string> {
	private value: string;

	public static readonly validationRegex =
		// eslint-disable-next-line max-len
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	constructor(email: string) {
		super();

		if (!email.match(Email.validationRegex))
			throw new Error(`The email ${email} is not valid`);

		this.value = email;
	}

	public getValue(): string {
		return this.value;
	}

}
