import { Repository } from './Repository';

export abstract class ActorRepository<T> extends Repository<T> {
	public abstract updateName(actor: T): Promise<void>;
	public abstract updateEmail(actor: T): Promise<void>;
	public abstract updatePasswordHash(actor: T): Promise<void>;
}
