import { internet, name } from 'faker';

import { Client } from '@entities/Client';
import { Id } from '@domainTypes/Id';
import { Email } from '@domainTypes/Email';
import { Name } from '@domainTypes/Name';


describe('Client Entity', () => {
	const repeatedId = new Id;

	it('return the name', () => {
		const clientName = new Name(name.findName());
		const client = Client.new(clientName, new Email(internet.email()), internet.password());

		expect(client.getName()).toBe(clientName);
	});

	it('modify the name', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		const newClientName = new Name(name.findName());
		client.setName(newClientName);

		expect(client.getName()).toBe(newClientName);
	});

	it('return the email', () => {
		const clientEmail = new Email(internet.email());
		const client = Client.new(new Name(name.findName()), clientEmail, internet.password());

		expect(client.getEmail()).toBe(clientEmail);
	});

	it('modify the email', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		const newClientEmail = new Email(internet.email());
		client.setEmail(newClientEmail);

		expect(client.getEmail()).toBe(newClientEmail);
	});

	it('return the passwordHash', () => {
		const clientPasswordHash = internet.password();
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			clientPasswordHash
		);

		expect(client.getPasswordHash()).toBe(clientPasswordHash);
	});

	it('modify the passwordHash', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		const newClientPasswordHash = internet.password();
		client.setPasswordHash(newClientPasswordHash);

		expect(client.getPasswordHash()).toBe(newClientPasswordHash);
	});

	it('add favorite foods id', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		const foodId = new Id;

		client.addFavoriteFood(repeatedId);
		client.addFavoriteFood(foodId);
		client.addFavoriteFood(repeatedId);

		const favoriteFoodsId = client.getFavoriteFoodsId();

		expect(favoriteFoodsId).toHaveLength(2);
		for (const favoriteFoodId of favoriteFoodsId) {
			expect(favoriteFoodId === foodId || favoriteFoodId === repeatedId).toBeTruthy();
		}
	});

	it('remove favorite foods id', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		{
			client.removeFavoriteFood(repeatedId);
			const favoriteFoodsId = client.getFavoriteFoodsId();

			expect(favoriteFoodsId).toStrictEqual([]);
		}
		{
			const foodId = new Id;
			client.addFavoriteFood(repeatedId);
			client.addFavoriteFood(foodId);
			client.addFavoriteFood(repeatedId);
			client.removeFavoriteFood(repeatedId);
			const favoriteFoodsId = client.getFavoriteFoodsId();

			expect(favoriteFoodsId).toHaveLength(1);
			expect(favoriteFoodsId).toStrictEqual([foodId]);
		}
	});

	it('return favorite foods id', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		expect(client.getFavoriteFoodsId()).toStrictEqual([]);

		const food1 = new Id, food2 = new Id;
		client.addFavoriteFood(food1);
		client.addFavoriteFood(food2);
		client.addFavoriteFood(new Id);
		expect(client.getFavoriteFoodsId()).toHaveLength(3);

		client.removeFavoriteFood(food1);
		expect(client.getFavoriteFoodsId()).toHaveLength(2);

		client.removeFavoriteFood(food2);
		expect(client.getFavoriteFoodsId()).toHaveLength(1);
	});

	it('add a requested order id', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		client.addRequestedOrder(repeatedId);
		client.addRequestedOrder(repeatedId);

		expect(client.getRequestedOrdersId()).toStrictEqual([repeatedId]);

		const orderId = new Id;
		client.addRequestedOrder(orderId);

		const requestedOrdersId = client.getRequestedOrdersId();
		expect(requestedOrdersId).toHaveLength(2);
		for (const requestedOrderId of requestedOrdersId) {
			expect(requestedOrderId === orderId || requestedOrderId === repeatedId).toBeTruthy();
		}
	});

	it('return the requested orders id', () => {
		const client = Client.new(
			new Name(name.findName()),
			new Email(internet.email()),
			internet.password()
		);

		expect(client.getRequestedOrdersId()).toStrictEqual([]);

		client.addRequestedOrder(new Id);
		expect(client.getRequestedOrdersId()).toHaveLength(1);

		client.addRequestedOrder(new Id);
		client.addRequestedOrder(new Id);
		expect(client.getRequestedOrdersId()).toHaveLength(3);

		client.addRequestedOrder(new Id);
		expect(client.getRequestedOrdersId()).toHaveLength(4);
	});

});
