import { Price } from './PriceType';


describe('Name type', () => {

	it('create a new price', () => {
		const value = 12.50;
		const price = new Price(value);

		expect(price.getValue()).toBe(value);
	});

	it('throw a Error when create a Price with negative value', () => {
		const value = -6.25;

		expect(() => new Price(value))
			.toThrowError(new Error(`The price can not be negative ${value}`));
	});

	it('apply the Discount in price', () => {
		const price = new Price(12.50);
		const discountedPrice = price.applyDiscount(0.10);

		expect(discountedPrice.getValue()).toBe(11.25);
	});

	it('throw an Error when calculate the total with a negative or decimal count', () => {
		const price = new Price(100);

		const negativeCount = -2;
		expect(() => price.calculateTotal(negativeCount))
			.toThrowError(new Error(`The count must be a positive integer number ${negativeCount}`));

		const decimalCount = 3.1415;
		expect(() => price.calculateTotal(decimalCount))
			.toThrowError(new Error(`The count must be a positive integer number ${decimalCount}`));
	});

});
