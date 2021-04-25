import { Id } from '@domainTypes/Id';

export abstract class Entity {
	public abstract readonly id: Id;
}
