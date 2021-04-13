import { v4 as uuidv4 } from 'uuid';

import { Actor } from '../abstract/Actor';
import { MailService } from '../../services/MailService';

export class Client extends Actor {
	public readonly id: string;
	protected name: string;
	protected email: string;
	protected password: string;

	private requestedOrdersId: string[];
	private favoriteFoodsId: string[];

	constructor(
		id: string,
		name: string,
		email: string,
		password: string,
		requestedOrdersId: string[],
		favoriteFoodsId: string[],
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.requestedOrdersId = requestedOrdersId;
		this.favoriteFoodsId = favoriteFoodsId;
	}

	public static new(name: string, email: string, password: string): Client {
		return new Client(uuidv4(), name, email, password, [], []);
	}

	public getName(): string {
		throw new Error('Method not implemented.');
	}
	public setName(name: string): void {
		throw new Error('Method not implemented.');
	}
	public getEmail(): string {
		throw new Error('Method not implemented.');
	}
	public updateEmail(email: string, mailService: MailService): void {
		throw new Error('Method not implemented.');
	}
	public updatePassword(password: string, mailService: MailService): void {
		throw new Error('Method not implemented.');
	}
	public authenticate(email: string, password: string): boolean {
		throw new Error('Method not implemented.');
	}

	public getFavoriteFoodsId(): string {
		throw new Error('Method not implemented.');
	}
	public addFavoriteFood(foodId: string): void {
		throw new Error('Method not implemented.');
	}
	public removeFavoriteFood(foodId: string): void {
		throw new Error('Method not implemented.');
	}

	public getRequestedOrdersId(): string[] {
		throw new Error('Method not implemented.');
	}
	public addRequestedOrder(orderId: string): void {
		throw new Error('Method not implemented.');
	}

	public getPendingOrdersId(): string[] {
		throw new Error('Method not implemented.');
	}
}
