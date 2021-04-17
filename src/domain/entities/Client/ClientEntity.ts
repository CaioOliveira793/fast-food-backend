import { v4 as uuidv4 } from 'uuid';

import { Actor } from '@entities/abstract/Actor';

export class Client extends Actor {
	public readonly id: string;
	protected name: string;
	protected email: string;
	protected passwordHash: string;

	private requestedOrdersId: Set<string>;
	private favoriteFoodsId: Set<string>;

	constructor(
		id: string,
		name: string,
		email: string,
		passwordHash: string,
		requestedOrdersId?: string[],
		favoriteFoodsId?: string[],
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.passwordHash = passwordHash;
		this.requestedOrdersId = new Set(requestedOrdersId);
		this.favoriteFoodsId = new Set(favoriteFoodsId);
	}

	public static new(name: string, email: string, passwordHash: string): Client {
		return new Client(uuidv4(), name, email, passwordHash, [], []);
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

	public getFavoriteFoodsId(): string[] {
		return [...this.favoriteFoodsId];
	}
	public addFavoriteFood(foodId: string): void {
		this.favoriteFoodsId.add(foodId);
	}
	public removeFavoriteFood(foodId: string): void {
		this.favoriteFoodsId.delete(foodId);
	}

	public getRequestedOrdersId(): string[] {
		return [...this.requestedOrdersId];
	}
	public addRequestedOrder(orderId: string): void {
		this.requestedOrdersId.add(orderId);
	}
}
