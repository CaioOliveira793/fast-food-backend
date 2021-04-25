import { datatype, internet, name } from 'faker';

import { Food } from '@entities/Food';
import { OrderItem } from '@entities/OrderItem';
import { URL } from 'url';


describe('Order Item entity', () => {

	it('create a new Order entity from Food', () => {
		const foodName = name.findName();
		const foodPrice = datatype.number({ min: 1, max: 9999 });
		const foodDiscount = datatype.number({ min: 0.1, max: 0.90, precision: 0.0001 });
		const foodImageAddress = internet.url();
		const orderCount = 12;

		const food = Food.new(foodName, foodPrice, foodDiscount, new URL(foodImageAddress));
		const orderItem = OrderItem.fromFood(food, orderCount);

		expect(orderItem.name).toBe(foodName);
		expect(orderItem.price).toBe(food.getCalculatedPrice() * orderCount);
	});

	it('return the unfinished count', () => {
		const orderItemName = name.findName();
		const orderItemPrice = datatype.number({ min: 1, max: 9999 });
		const orderItemCount = 3;
		const orderItem = OrderItem.new(orderItemName, orderItemPrice, orderItemCount);

		expect(orderItem.getUnfinishedCount()).toBe(3);
		expect(orderItem.getFinishedCount()).toBe(0);

		orderItem.finish(1);
		expect(orderItem.getUnfinishedCount()).toBe(2);
		expect(orderItem.getFinishedCount()).toBe(1);
	});

	it('finish the Order Item', () => {
		const orderItemName = name.findName();
		const orderItemPrice = datatype.number({ min: 1, max: 9999 });
		const orderItemCount = 3;
		const orderItem = OrderItem.new(orderItemName, orderItemPrice, orderItemCount);

		expect(orderItem.getUnfinishedCount()).toBe(3);

		orderItem.finish(3);
		expect(orderItem.getUnfinishedCount()).toBe(0);
		expect(orderItem.getFinishedCount()).toBe(3);
		expect(orderItem.isFinished()).toBeTruthy();
	});

	it('throw an Error when finish more items than that are unfinished', () => {
		const orderItemName = name.findName();
		const orderItemPrice = datatype.number({ min: 1, max: 9999 });
		const orderItemCount = 2;
		const orderItem = OrderItem.new(orderItemName, orderItemPrice, orderItemCount);

		expect(() => orderItem.finish(3))
			.toThrowError(
				new Error(
					'It is not possible to finish a larger number of items of those that are unfinished'
				)
			);
		expect(orderItem.getUnfinishedCount()).toBe(2);
		expect(orderItem.getFinishedCount()).toBe(0);
		expect(orderItem.isFinished()).toBeFalsy();
	});

});
