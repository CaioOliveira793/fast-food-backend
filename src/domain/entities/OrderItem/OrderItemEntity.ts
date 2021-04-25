import { v4 as uuidv4 } from 'uuid';
import { URL } from 'url';

import { Entity } from '@entities/abstract/Entity';
import { Food } from '@entities/Food';


export class OrderItem extends Entity {
	public readonly id: string;

	public readonly name: string;
	public readonly imageAddress?: URL;
	public readonly price: number;
	public readonly count: number;
	private finishedCount: number;

	constructor(
		id: string,
		name: string,
		price: number,
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

	public static new(name: string, unitPrice: number, count: number, imageAddress?: URL): OrderItem {
		return new OrderItem(uuidv4(), name, unitPrice * count, count, 0, imageAddress);
	}
	public static fromFood(food: Food, count: number): OrderItem {
		return new OrderItem(
			uuidv4(),
			food.getName(),
			food.getCalculatedPrice() * count,
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
