import { Actor } from '@entities/abstract/Actor';
import { Id } from '@domainTypes/Id';


export class Client extends Actor {
	public readonly id: Id;
	protected name: string;
	protected email: string;
	protected passwordHash: string;

	private requestedOrdersId: Set<Id>;
	private favoriteFoodsId: Set<Id>;

	constructor(
		id: Id,
		name: string,
		email: string,
		passwordHash: string,
		requestedOrdersId?: Id[],
		favoriteFoodsId?: Id[],
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
		return new Client(new Id, name, email, passwordHash, [], []);
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

	public getFavoriteFoodsId(): Id[] {
		return [...this.favoriteFoodsId];
	}
	public addFavoriteFood(foodId: Id): void {
		this.favoriteFoodsId.add(foodId);
	}
	public removeFavoriteFood(foodId: Id): void {
		this.favoriteFoodsId.delete(foodId);
	}

	public getRequestedOrdersId(): Id[] {
		return [...this.requestedOrdersId];
	}
	public addRequestedOrder(orderId: Id): void {
		this.requestedOrdersId.add(orderId);
	}
}
