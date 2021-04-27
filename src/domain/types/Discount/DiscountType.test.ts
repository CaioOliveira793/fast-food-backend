import { Discount } from './DiscountType';


describe('Discount Type', () => {

	it('create a new Discount', () => {
		const discountPercentage = 0.1;
		const discount = new Discount(discountPercentage);

		expect(discount.getValue()).toBe(discountPercentage);
	});

	it('throw a error when set the discount greater than 1', () => {
		const discountPercentage = 12.432;

		expect(() => new Discount(discountPercentage))
			.toThrowError(
				new Error(`Discount can not be greater than 1 or lower than 0. ${discountPercentage}`)
			);
	});

	it('throw a error when set the discount lower than 0', () => {
		const discountPercentage = -23.69;

		expect(() => new Discount(discountPercentage))
			.toThrowError(
				new Error(`Discount can not be greater than 1 or lower than 0. ${discountPercentage}`)
			);
	});

});
