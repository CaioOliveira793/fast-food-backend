import { Entity } from './Entity';

export abstract class Actor extends Entity {
	protected abstract name: string;
	protected abstract email: string;
	protected abstract passwordHash: string;

	public abstract getName(): string;
	public abstract setName(name: string): void;

	public abstract getEmail(): string;
	public abstract setEmail(email: string): void;

	public abstract getPasswordHash(): string;
	public abstract setPasswordHash(passwordHash: string): void;
}
