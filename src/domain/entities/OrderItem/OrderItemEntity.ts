import { URL } from 'url';

import { Entity } from '@entities/abstract/Entity';
import { Food } from '@entities/Food';
import { Id } from '@domainTypes/Id';
import { Price } from '@domainTypes/Price';
import { Name } from '@domainTypes/Name';


export class OrderItem extends Entity {
	public readonly id: Id;

	public readonly name: Name;
	public readonly imageAddress?: URL;
	public readonly price: Price;
	public readonly count: number;
	private finishedCount: number;

	constructor(
		id: Id,
		name: Name,
		price: Price,
		count: number,
		finishedCount: number,
		imageAddress?: URL,
	) {
		super();
		this.id = id;
		this.name = name;
		this.imageAddress = imageAddress;
		this.price = price;
		this.count = count;
		this.finishedCount = finishedCount;
	}

	public static new(name: Name, unitPrice: Price, count: number, imageAddress?: URL): OrderItem {
		return new OrderItem(new Id, name, unitPrice.calculateTotal(count), count, 0, imageAddress);
	}
	public static fromFood(food: Food, count: number): OrderItem {
		return new OrderItem(
			new Id,
			food.getName(),
			food.getCalculatedPrice().calculateTotal(count),
			count,
			0,
			food.getImageAddress()
		);
	}

	public getFinishedCount(): number {
		return this.finishedCount;
	}
	public getUnfinishedCount(): number {
		return this.count - this.finishedCount;
	}
	public isFinished(): boolean {
		return this.finishedCount === this.count;
	}

	public finish(count: number): void {
		if (this.getUnfinishedCount() < count)
			throw new Error(
				'It is not possible to finish a larger number of items of those that are unfinished'
			);
		this.finishedCount += count;
	}
}
