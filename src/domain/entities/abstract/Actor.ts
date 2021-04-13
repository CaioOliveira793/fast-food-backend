import { Entity } from './Entity';
import { MailService } from '../../services/MailService';

export abstract class Actor extends Entity {
	protected abstract name: string;
	protected abstract email: string;
	protected abstract password: string;

	public abstract getName(): string;
	public abstract setName(name: string): void;

	public abstract getEmail(): string;

	public abstract updateEmail(email: string, mailService: MailService): void;
	public abstract updatePassword(password: string, mailService: MailService): void;

	public abstract authenticate(email: string, password: string): boolean;
}
