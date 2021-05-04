import { datatype, internet, name } from 'faker';
import { URL } from 'url';

import { Food } from '@entities/Food';
import { Price } from '@domainTypes/Price';
import { Discount } from '@domainTypes/Discount';
import { Name } from '@domainTypes/Name';

const fakeNumberProperties = { min: 0, max: 1, precision: 0.0001 };

describe('Food entity', () => {

	it('return the name', () => {
		const foodName = new Name(name.findName());
		const food = Food.new(foodName, new Price(datatype.number()));

		expect(food.getName()).toBe(foodName);
	});

	it('modify the name', () => {
		const food = Food.new(new Name(name.findName()), new Price(datatype.number()));
		const newFoodName = new Name(name.findName());
		food.setName(newFoodName);

		expect(food.getName()).toBe(newFoodName);
	});

	it('return the raw price', () => {
		const rawFoodPrice = new Price(datatype.number());
		const food = Food.new(new Name(name.findName()), rawFoodPrice);

		expect(food.getRawPrice()).toStrictEqual(rawFoodPrice);
	});

	it('set the raw price', () => {
		const food = Food.new(new Name(name.findName()), new Price(datatype.number()));
		const newRawPrice = new Price(datatype.number());
		food.setRawPrice(newRawPrice);

		expect(food.getRawPrice()).toBe(newRawPrice);
	});

	it('return the discount', () => {
		const foodDiscount = new Discount(datatype.number(fakeNumberProperties));
		const food = Food.new(new Name(name.findName()), new Price(datatype.number()), foodDiscount);

		expect(food.getDiscount()).toBe(foodDiscount);
	});

	it('set the discount', () => {
		const food = Food.new(new Name(name.findName()), new Price(datatype.number()));
		const newDiscount = new Discount(datatype.number(fakeNumberProperties));
		food.setDiscount(newDiscount);

		expect(food.getDiscount()).toBe(newDiscount);
	});

	it('return the calculated price', () => {
		const rawPrice = new Price(200);
		const discount = new Discount(0.20);
		const food = Food.new(new Name(name.findName()), rawPrice, discount);

		expect(food.getCalculatedPrice()).toStrictEqual(new Price(160));
	});

	it('return a image address', () => {
		const imageAddress = new URL(internet.url());
		const food = Food.new(
			new Name(name.findName()),
			new Price(datatype.number()),
			new Discount(datatype.number(fakeNumberProperties)),
			imageAddress
		);

		expect(food.getImageAddress()).toBe(imageAddress);
	});

	it('not return a image address', () => {
		const food = Food.new(
			new Name(name.findName()),
			new Price(datatype.number()),
			new Discount(datatype.number(fakeNumberProperties))
		);

		expect(food.getImageAddress()).toBeUndefined();
	});

	it('set the image address', () => {
		const food = Food.new(
			new Name(name.findName()),
			new Price(datatype.number()),
			new Discount(datatype.number(fakeNumberProperties))
		);
		expect(food.getImageAddress()).toBeUndefined();

		const imageAddress = new URL(internet.url());
		food.setImageAddress(imageAddress);

		expect(food.getImageAddress()).toBe(imageAddress);
	});

	it('remove a image address', () => {
		const food = Food.new(
			new Name(name.findName()),
			new Price(datatype.number()),
			new Discount(datatype.number(fakeNumberProperties))
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
