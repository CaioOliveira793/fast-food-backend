import { datatype, internet, name } from 'faker';
import { URL } from 'url';

import { Food } from './FoodEntity';

describe('Food entity', () => {

	it('return the name', () => {
		const foodName = name.findName();
		const food = Food.new(foodName, datatype.number());

		expect(food.getName()).toBe(foodName);
	});

	it('modify the name', () => {
		const food = Food.new(name.findName(), datatype.number());
		const newFoodName = name.findName();
		food.setName(newFoodName);

		expect(food.getName()).toBe(newFoodName);
	});

	it('return the raw price', () => {
		const rawFoodPrice = datatype.number();
		const food = Food.new(name.findName(), rawFoodPrice);

		expect(food.getRawPrice()).toBe(rawFoodPrice);
	});

	it('set the raw price', () => {
		const food = Food.new(name.findName(), datatype.number());
		const newRawPrice = datatype.number();
		food.setRawPrice(newRawPrice);

		expect(food.getRawPrice()).toBe(newRawPrice);
	});

	it('throw a error when set the raw price a negative value', () => {
		const rawFoodPrice = datatype.number();
		const food = Food.new(name.findName(), rawFoodPrice);
		const negativeRawPrice = datatype.number({ min: -999, max: 0 });

		expect(() => food.setRawPrice(negativeRawPrice))
			.toThrowError(new Error(`A food price can not be a negative value. ${negativeRawPrice}`));
		expect(food.getRawPrice()).toBe(rawFoodPrice);

		{
			const negativeRawPrice = datatype.number({ min: -999, max: 0 });
			expect(() => Food.new(name.findName(), negativeRawPrice))
				.toThrowError(new Error(`A food price can not be a negative value. ${negativeRawPrice}`));
		}
	});

	it('return the discount', () => {
		const foodDiscount = datatype.number({ min: 0, max: 1, precision: 0.0001 });
		const food = Food.new(name.findName(), datatype.number(), foodDiscount);

		expect(food.getDiscount()).toBe(foodDiscount);
	});

	it('set the discount', () => {
		const food = Food.new(name.findName(), datatype.number());
		const newDiscount = datatype.number({ min: 0, max: 1, precision: 0.0001 });
		food.setDiscount(newDiscount);

		expect(food.getDiscount()).toBe(newDiscount);
	});

	it('throw a error when set the discount greater than 1', () => {
		const foodDiscount = datatype.number({ min: 0, max: 1, precision: 0.0001 });
		const food = Food.new(name.findName(), datatype.number(), foodDiscount);

		const greaterThanOneDiscount = datatype.number({ min: 1, max: 100 });
		expect(() => food.setDiscount(greaterThanOneDiscount))
			.toThrowError(
				new Error(
					`A food discount can not be greater than 1 or lower than 0. ${greaterThanOneDiscount}`
				)
			);
		expect(food.getDiscount()).toBe(foodDiscount);

		{
			const greaterThanOneDiscount = datatype.number({ min: 1, max: 100 });
			expect(() => Food.new(name.findName(), datatype.number(), greaterThanOneDiscount))
				.toThrowError(
					new Error(
						`A food discount can not be greater than 1 or lower than 0. ${greaterThanOneDiscount}`
					)
				);
		}
	});

	it('throw a error when set the discount lower than 0', () => {
		const foodDiscount = datatype.number({ min: 0, max: 1, precision: 0.0001 });
		const food = Food.new(name.findName(), datatype.number(), foodDiscount);

		const lowerThanZeroDiscount = datatype.number({ min: -100, max: 0 });
		expect(() => food.setDiscount(lowerThanZeroDiscount))
			.toThrowError(
				new Error(
					`A food discount can not be greater than 1 or lower than 0. ${lowerThanZeroDiscount}`
				)
			);
		expect(food.getDiscount()).toBe(foodDiscount);

		{
			const lowerThanZeroDiscount = datatype.number({ min: -100, max: 0 });
			expect(() => Food.new(name.findName(), datatype.number(), lowerThanZeroDiscount))
				.toThrowError(
					new Error(
						`A food discount can not be greater than 1 or lower than 0. ${lowerThanZeroDiscount}`
					)
				);
		}
	});

	it('return the calculated price', () => {
		const rawPrice = 200;
		const discount = 0.20;
		const food = Food.new(name.findName(), rawPrice, discount);

		expect(food.getCalculatedPrice()).toBe(160);
	});

	it('return a image address', () => {
		const imageAddress = new URL(internet.url());
		const food = Food.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 0, max: 1, precision: 0.0001 }),
			imageAddress
		);

		expect(food.getImageAddress()).toBe(imageAddress);
	});

	it('not return a image address', () => {
		const food = Food.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 0, max: 1, precision: 0.0001 })
		);

		expect(food.getImageAddress()).toBeUndefined();
	});

	it('set the image address', () => {
		const food = Food.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 0, max: 1, precision: 0.0001 })
		);
		expect(food.getImageAddress()).toBeUndefined();

		const imageAddress = new URL(internet.url());
		food.setImageAddress(imageAddress);

		expect(food.getImageAddress()).toBe(imageAddress);
	});

	it('remove a image address', () => {
		const food = Food.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 0, max: 1, precision: 0.0001 })
		);

		food.removeImageAddress();
		expect(food.getImageAddress()).toBeUndefined();

		const imageAddress = new URL(internet.url());
		food.setImageAddress(imageAddress);
		expect(food.getImageAddress()).toBe(imageAddress);

		food.removeImageAddress();
		expect(food.getImageAddress()).toBeUndefined();
	});

});