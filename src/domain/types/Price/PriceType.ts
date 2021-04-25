import { DomainType } from '@domainTypes/DomainType';


export class Price extends DomainType<number> {
	private value: number;

	constructor(price: number) {
		super();

		if (price < 0)
			throw new Error(`The price can not be negative ${price}`);

		this.value = price;
	}

	public getValue(): number {
		return this.value;
	}

	public applyDiscount(discount: number): Price {
		return new Price(this.value - (this.value * discount));
	}

	public calculateTotal(count: number): Price {
		if (count < 0 || !Number.isInteger(count))
			throw new Error(`The count must be a positive integer number ${count}`);

		return new Price(this.value * count);
	}
}
