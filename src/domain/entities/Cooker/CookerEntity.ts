import { v4 as uuidv4 } from 'uuid';

import { Actor } from '@entities/abstract/Actor';

export interface FinishedFood {
	orderId: string;
	foodId: string;
	finishTime: Date;
}

export class Cooker extends Actor {
	public readonly id: string;

	protected name: string;
	protected email: string;
	protected passwordHash: string;

	private finishedFoods: FinishedFood[];

	constructor(
		id: string,
		name: string,
		email: string,
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

	public static new(name: string, email: string, passwordHash: string): Cooker {
		return new Cooker(uuidv4(), name, email, passwordHash);
	}

	public getName(): string {
		return this.name;
	}
	public setName(name: string): void {
		this.name = name;
	}
	public getEmail(): string {
		return this.email;
	}
	public setEmail(email: string): void {
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
