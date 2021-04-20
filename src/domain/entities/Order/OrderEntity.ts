import { v4 as uuidv4 } from 'uuid';

import { Entity } from '@entities/abstract/Entity';
import { OrderItem } from '@entities/OrderItem';

export const enum OrderStatus {
	Preparing,
	Ready,
	Closed,
}

export class Order extends Entity {
	public readonly id: string;

	public readonly clientId: string;
	private readonly items: Map<string, OrderItem>;
	public readonly totalPrice: number;
	private status: OrderStatus;

	constructor(
		id: string,
		clientId: string,
		items: OrderItem[],
		totalPrice: number,
		status: OrderStatus
	) {
		super();
		this.id = id;
		this.clientId = clientId;
		this.items = new Map(items.map(item => [item.id, item]));
		this.totalPrice = totalPrice;
		this.status = status;
	}

	public static new(clientId: string, items: OrderItem[]): Order {
		if (items.length < 1)
			throw new Error('A Order need at least one item to be created');

		const totalPrice = items
			.map(orderItem => orderItem.price * orderItem.count)
			.reduce((prevPrice, currPrice) => prevPrice + currPrice);
		return new Order(uuidv4(), clientId, items, totalPrice, OrderStatus.Preparing);
	}

	public getItems(): OrderItem[] {
		return [...this.items.values()];
	}

	public getStatus(): OrderStatus {
		return this.status;
	}

	public finishItem(itemId: string, count: number): void {
		const orderItem = this.items.get(itemId);
		if (!orderItem) throw new Error(`Order Item with id ${itemId} was not found`);

		orderItem.finish(count);
		this.items.set(itemId, orderItem);

		if (orderItem.isFinished() && this.isReady()) {
			this.status = OrderStatus.Ready;
		}
	}

	public closeOrder(): void {
		this.status = OrderStatus.Closed;
	}

	private isReady(): boolean {
		const orderItems = this.items.values();
		for (const item of orderItems) {
			if (!item.isFinished()) return false;
		}
		return true;
	}
}
