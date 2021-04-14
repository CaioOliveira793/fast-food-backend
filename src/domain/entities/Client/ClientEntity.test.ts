import { internet, name } from 'faker';
import { v4 as uuidv4 } from 'uuid';

import { Client } from '@entities/Client';


describe('Client Entity', () => {
	const repeatedId = uuidv4();

	it('return the name of a Client entity', () => {
		const clientName = name.findName();
		const client = Client.new(clientName, internet.email(), internet.password());

		expect(client.getName()).toBe(clientName);
	});

	it('modify the name of a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		const newClientName = name.findName();
		client.setName(newClientName);

		expect(client.getName()).toBe(newClientName);
	});

	it('return the email of a Client entity', () => {
		const clientEmail = internet.email();
		const client = Client.new(name.findName(), clientEmail, internet.password());

		expect(client.getEmail()).toBe(clientEmail);
	});

	it('modify the email of a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		const newClientEmail = internet.email();
		client.setEmail(newClientEmail);

		expect(client.getEmail()).toBe(newClientEmail);
	});

	it('return the passwordHash of a Client entity', () => {
		const clientPasswordHash = internet.password();
		const client = Client.new(name.findName(), internet.email(), clientPasswordHash);

		expect(client.getPasswordHash()).toBe(clientPasswordHash);
	});

	it('return the passwordHash of a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		const newClientPasswordHash = internet.password();
		client.setPasswordHash(newClientPasswordHash);

		expect(client.getPasswordHash()).toBe(newClientPasswordHash);
	});

	it('add favorite foods id in a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		const foodId = uuidv4();

		client.addFavoriteFood(repeatedId);
		client.addFavoriteFood(foodId);
		client.addFavoriteFood(repeatedId);

		const favoriteFoodsId = client.getFavoriteFoodsId();

		expect(favoriteFoodsId).toHaveLength(2);
		for (const favoriteFoodId of favoriteFoodsId) {
			expect(favoriteFoodId === foodId || favoriteFoodId === repeatedId).toBeTruthy();
		}
	});

	it('remove favorite foods id in a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		{
			client.removeFavoriteFood(repeatedId);
			const favoriteFoodsId = client.getFavoriteFoodsId();

			expect(favoriteFoodsId).toStrictEqual([]);
		}
		{
			const foodId = uuidv4();
			client.addFavoriteFood(repeatedId);
			client.addFavoriteFood(foodId);
			client.addFavoriteFood(repeatedId);
			client.removeFavoriteFood(repeatedId);
			const favoriteFoodsId = client.getFavoriteFoodsId();

			expect(favoriteFoodsId).toHaveLength(1);
			expect(favoriteFoodsId).toStrictEqual([foodId]);
		}
	});

	it('return favorite foods id in a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		{
			const favoriteFoodsId = client.getFavoriteFoodsId();
			expect(favoriteFoodsId).toStrictEqual([]);
		}
		{
			const food1 = uuidv4(), food2 = uuidv4();
			client.addFavoriteFood(food1);
			client.addFavoriteFood(food2);
			client.addFavoriteFood(uuidv4());
			expect(client.getFavoriteFoodsId()).toHaveLength(3);

			client.removeFavoriteFood(food1);
			expect(client.getFavoriteFoodsId()).toHaveLength(2);

			client.removeFavoriteFood(food2);
			expect(client.getFavoriteFoodsId()).toHaveLength(1);
		}
	});

	it('add a requested order in a Client entity', () => {
		const client = Client.new(name.findName(), internet.email(), internet.password());
		client.addRequestedOrder(repeatedId);
		client.addRequestedOrder(repeatedId);

		expect(client.getRequestedOrdersId()).toStrictEqual([repeatedId]);

		const orderId = uuidv4();
		client.addRequestedOrder(orderId);

		const requestedOrdersId = client.getRequestedOrdersId();
		expect(requestedOrdersId).toHaveLength(2);
		for (const requestedOrderId of requestedOrdersId) {
			expect(requestedOrderId === orderId || requestedOrderId === repeatedId).toBeTruthy();
		}
	});

});