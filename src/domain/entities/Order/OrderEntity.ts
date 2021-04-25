import { Entity } from '@entities/abstract/Entity';
import { OrderItem } from '@entities/OrderItem';
import { Id } from '@domainTypes/Id';
import { Price } from '@domainTypes/Price';

export const enum OrderStatus {
	Preparing,
	Ready,
	Closed,
}

export class Order extends Entity {
	public readonly id: Id;

	public readonly clientId: Id;
	private readonly items: Map<string, OrderItem>;
	public readonly totalPrice: Price;
	private status: OrderStatus;

	constructor(
		id: Id,
		clientId: Id,
		items: OrderItem[],
		totalPrice: Price,
		status: OrderStatus
	) {
		super();
		this.id = id;
		this.clientId = clientId;
		this.items = new Map(items.map(item => [item.id.getValue(), item]));
		this.totalPrice = totalPrice;
		this.status = status;
	}

	public static new(clientId: Id, items: OrderItem[]): Order {
		if (items.length < 1)
			throw new Error('A Order need at least one item to be created');

		const totalPrice = new Price(items
			.map(orderItem => orderItem.price.calculateTotal(orderItem.count).getValue())
			.reduce((prevPrice, currPrice) => prevPrice + currPrice));
		return new Order(new Id, clientId, items, totalPrice, OrderStatus.Preparing);
	}

	public getItems(): OrderItem[] {
		return [...this.items.values()];
	}

	public getStatus(): OrderStatus {
		return this.status;
	}

	public finishItem(itemId: Id, count: number): void {
		const orderItem = this.items.get(itemId.getValue());
		if (!orderItem) throw new Error(`Order Item with id ${itemId.getValue()} was not found`);

		orderItem.finish(count);
		this.items.set(itemId.getValue(), orderItem);

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
