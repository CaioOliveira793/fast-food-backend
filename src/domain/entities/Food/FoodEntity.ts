import { v4 as uuidv4 } from 'uuid';
import { URL } from 'url';

import { Entity } from '@entities/abstract/Entity';

export class Food extends Entity {
	public readonly id: string;

	private name: string;
	private rawPrice: number;
	private discount: number;
	private imageAddress?: URL;

	constructor(
		id: string,
		name: string,
		rawPrice: number,
		discount = 0,
		imageAddress?: URL
	) {
		super();
		this.id = id;
		this.name = name;
		this.imageAddress = imageAddress;

		if (discount < 0 || discount > 1)
			throw new Error(`A food discount can not be greater than 1 or lower than 0. ${discount}`);
		if (rawPrice < 0)
			throw new Error(`A food price can not be a negative value. ${rawPrice}`);

		this.discount = discount;
		this.rawPrice = rawPrice;
	}

	public static new(name: string, rawPrice: number, discount = 0, imageAddress?: URL): Food {
		return new Food(uuidv4(), name, rawPrice, discount, imageAddress);
	}

	public getName(): string {
		return this.name;
	}
	public setName(name: string): void {
		this.name = name;
	}

	public getRawPrice(): number {
		return this.rawPrice;
	}
	public setRawPrice(rawPrice: number): void {
		if (rawPrice < 0)
			// TODO: use a DomainException type
			throw new Error(`A food price can not be a negative value. ${rawPrice}`);

		this.rawPrice = rawPrice;
	}

	public getDiscount(): number {
		return this.discount;
	}
	public setDiscount(discount: number): void {
		if (discount < 0 || discount > 1)
			// TODO: use a DomainException type
			throw new Error(`A food discount can not be greater than 1 or lower than 0. ${discount}`);

		this.discount = discount;
	}

	public getCalculatedPrice(): number {
		return this.rawPrice - (this.rawPrice * this.discount);
	}

	public getImageAddress(): URL | void {
		return this.imageAddress;
	}
	public setImageAddress(imageAddress: URL): void {
		this.imageAddress = imageAddress;
	}
	public removeImageAddress(): void {
		this.imageAddress = undefined;
	}
}
