import { URL } from 'url';

import { Entity } from '@entities/abstract/Entity';
import { Id } from '@domainTypes/Id';
import { Price } from '@domainTypes/Price';
import { Discount } from '@domainTypes/Discount';
import { Name } from '@domainTypes/Name';

export class Food extends Entity {
	public readonly id: Id;

	private name: Name;
	private rawPrice: Price;
	private discount: Discount;
	private imageAddress?: URL;

	constructor(
		id: Id,
		name: Name,
		rawPrice: Price,
		discount: Discount,
		imageAddress?: URL
	) {
		super();
		this.id = id;
		this.name = name;
		this.imageAddress = imageAddress;
		this.discount = discount;
		this.rawPrice = rawPrice;
	}

	public static new(
		name: Name,
		rawPrice: Price,
		discount = new Discount(0),
		imageAddress?: URL
	): Food {
		return new Food(new Id, name, rawPrice, discount, imageAddress);
	}

	public getName(): Name {
		return this.name;
	}
	public setName(name: Name): void {
		this.name = name;
	}

	public getRawPrice(): Price {
		return this.rawPrice;
	}
	public setRawPrice(rawPrice: Price): void {
		this.rawPrice = rawPrice;
	}

	public getDiscount(): Discount {
		return this.discount;
	}
	public setDiscount(discount: Discount): void {
		this.discount = discount;
	}

	public getCalculatedPrice(): Price {
		return this.rawPrice.applyDiscount(this.discount);
	}

	public getImageAddress(): URL | undefined {
		return this.imageAddress;
	}
	public setImageAddress(imageAddress: URL): void {
		this.imageAddress = imageAddress;
	}
	public removeImageAddress(): void {
		this.imageAddress = undefined;
	}
}
