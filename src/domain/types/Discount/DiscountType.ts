import { DomainType } from '@domainTypes/DomainType';


export class Discount extends DomainType<number> {
	private value: number;

	constructor(discount: number) {
		super();

		if (discount < 0 || discount > 1)
			throw new Error(`Discount can not be greater than 1 or lower than 0. ${discount}`);

		this.value = discount;
	}

	public getValue(): number {
		return this.value;
	}

}
