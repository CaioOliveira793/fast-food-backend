import * as bcrypt from 'bcrypt';

import { DomainType } from '@domainTypes/DomainType';


export class PasswordHash extends DomainType<string> {
	constructor(rawPassword: string) {
		super();

		// TODO: encrypt rawPassword
		this.hash = bcrypt.hashSync(rawPassword, PasswordHash.ROUNDS);
	}

	public getValue(): string { return this.hash; }


	private hash: string;
	private static ROUNDS = 10;
}
