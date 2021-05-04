import { Actor } from '@entities/abstract/Actor';
import { Id } from '@domainTypes/Id';
import { Email } from '@domainTypes/Email';
import { Name } from '@domainTypes/Name';

export interface FinishedFood {
	orderId: string;
	foodId: string;
	finishTime: Date;
}

export class Cooker extends Actor {
	public readonly id: Id;

	protected name: Name;
	protected email: Email;
	protected passwordHash: string;

	private finishedFoods: FinishedFood[];

	constructor(
		id: Id,
		name: Name,
		email: Email,
		passwordHash: string,
		finishedFoods?: FinishedFood[]
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
		this.finishedFoods = finishedFoods ?? [];
	}

	public static new(name: Name, email: Email, passwordHash: string): Cooker {
		return new Cooker(new Id, name, email, passwordHash);
	}

	public getName(): Name {
		return this.name;
	}
	public setName(name: Name): void {
		this.name = name;
	}
	public getEmail(): Email {
		return this.email;
	}
	public setEmail(email: Email): void {
		this.email = email;
	}
	public getPasswordHash(): string {
		return this.passwordHash;
	}
	public setPasswordHash(passwordHash: string): void {
		this.passwordHash = passwordHash;
	}

	public getFinishedFoods(): FinishedFood[] {
		return [...this.finishedFoods];
	}
	public addFinishedFood(finishedFood: FinishedFood): void {
		this.finishedFoods.push(finishedFood);
	}
}
