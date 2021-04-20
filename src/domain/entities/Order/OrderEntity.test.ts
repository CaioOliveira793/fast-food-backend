import { datatype, name } from 'faker';
import { v4 as uuidv4 } from 'uuid';

import { Order, OrderStatus } from '@entities/Order';
import { OrderItem } from '@entities/OrderItem';


describe('Order entity', () => {
	const repeatedId = uuidv4();
	let orderItem: OrderItem;

	beforeEach(() => {
		orderItem = OrderItem.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 1, max: 9999 })
		);
	});

	it('throw a Error when create Order without items', () => {
		expect(() => Order.new(repeatedId, []))
			.toThrowError(new Error('A Order need at least one item to be created'));
	});

	it('create a Order with the total price', () => {
		const orderPrice = orderItem.count * orderItem.price;
		const order = Order.new(repeatedId, [orderItem]);

		expect(order.totalPrice).toBe(orderPrice);
	});

	it('return the order items', () => {
		const orderItem2 = OrderItem.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 1, max: 9999 })
		);
		const orderItem3 = OrderItem.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 1, max: 9999 })
		);
		const order = Order.new(repeatedId, [orderItem, orderItem2, orderItem3]);
		const items = order.getItems();

		expect(items.length).toBe(3);
		for (const item of items) {
			expect(item === orderItem || item === orderItem2 || item === orderItem3).toBeTruthy();
		}
	});

	it('finish an order item', () => {
		const order = Order.new(repeatedId, [orderItem]);
		order.finishItem(orderItem.id, 1);
		const [updatedOrderItem] = order.getItems();

		expect(updatedOrderItem.getFinishedCount()).toBe(1);
	});

	it('finish an inexistent order item', () => {
		const itemId = uuidv4();
		const order = Order.new(repeatedId, [orderItem]);
		expect(() => order.finishItem(itemId, 1))
			.toThrowError(new Error(`Order Item with id ${itemId} was not found`));
	});

	it('return the status "Preparing" after creation', () => {
		const order = Order.new(repeatedId, [orderItem]);

		expect(order.getStatus()).toBe(OrderStatus.Preparing);
	});
	
	it('return the status "Ready" after finish all items', () => {
		const order = Order.new(repeatedId, [orderItem]);
		order.finishItem(orderItem.id, orderItem.getUnfinishedCount());

		expect(order.getStatus()).toBe(OrderStatus.Ready);
	});

	it('return the status "Preparing" after finish some items', () => {
		const orderItem2 = OrderItem.new(
			name.findName(),
			datatype.number(),
			datatype.number({ min: 1, max: 9999 })
		);
		const order = Order.new(repeatedId, [orderItem, orderItem2]);
		order.finishItem(orderItem.id, orderItem.getUnfinishedCount());

		expect(order.getStatus()).toBe(OrderStatus.Preparing);
	});

	it('return the status "Closed" after close the order', () => {
		const order = Order.new(repeatedId, [orderItem]);
		order.closeOrder();

		expect(order.getStatus()).toBe(OrderStatus.Closed);
	});

});
