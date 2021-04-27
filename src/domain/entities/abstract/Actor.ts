import { Email } from '@domainTypes/Email';
import { Entity } from './Entity';

export abstract class Actor extends Entity {
	protected abstract name: string;
	protected abstract email: Email;
	protected abstract passwordHash: string;

	public abstract getName(): string;
	public abstract setName(name: string): void;

	public abstract getEmail(): Email;
	public abstract setEmail(email: Email): void;

	public abstract getPasswordHash(): string;
	public abstract setPasswordHash(passwordHash: string): void;
}
