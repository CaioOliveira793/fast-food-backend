export abstract class Repository<T> {
	public abstract getById(id: string): Promise<T>;

	public abstract save(entity: T): Promise<void>;
	public abstract insert(entity: T): Promise<void>;
	public abstract update(entity: T): Promise<void>;
}
