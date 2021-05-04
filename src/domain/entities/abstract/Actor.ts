import { Email } from '@domainTypes/Email';
import { Name } from '@domainTypes/Name';
import { Entity } from './Entity';

export abstract class Actor extends Entity {
	protected abstract name: Name;
	protected abstract email: Email;
	protected abstract passwordHash: string;

	public abstract getName(): Name;
	public abstract setName(name: Name): void;

	public abstract getEmail(): Email;
	public abstract setEmail(email: Email): void;

	public abstract getPasswordHash(): string;
	public abstract setPasswordHash(passwordHash: string): void;
}
