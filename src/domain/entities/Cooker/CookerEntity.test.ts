import { internet, name } from 'faker';
import { v4 as uuidv4 } from 'uuid';

import { Cooker } from '@entities/Cooker';
import { FinishedFood } from './CookerEntity';
import { Email } from '@domainTypes/Email';


describe('Cooker entity', () => {

	it('get the name', () => {
		const cookerName = name.findName();
		const cooker = Cooker.new(cookerName, new Email(internet.email()), internet.password());

		expect(cooker.getName()).toBe(cookerName);
	});
	
	it('set the name', () => {
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), internet.password());
		const newCookerName = name.findName();
		cooker.setName(newCookerName);

		expect(cooker.getName()).toBe(newCookerName);
	});

	it('get the email', () => {
		const cookerEmail = new Email(internet.email());
		const cooker = Cooker.new(name.findName(), cookerEmail, internet.password());

		expect(cooker.getEmail()).toBe(cookerEmail);
	});

	it('set the email', () => {
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), internet.password());
		const newCookerEmail = new Email(internet.email());
		cooker.setEmail(newCookerEmail);

		expect(cooker.getEmail()).toBe(newCookerEmail);
	});

	it('get the password hash', () => {
		const cookerPasswordHash = internet.password();
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), cookerPasswordHash);

		expect(cooker.getPasswordHash()).toBe(cookerPasswordHash);
	});

	it('set the password hash', () => {
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), internet.password());
		const newCookerPasswordHash = internet.password();
		cooker.setPasswordHash(newCookerPasswordHash);

		expect(cooker.getPasswordHash()).toBe(newCookerPasswordHash);
	});

	it('get the finished foods', () => {
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), internet.password());

		expect(cooker.getFinishedFoods()).toStrictEqual([]);

		const finishedFood: FinishedFood = {
			orderId: uuidv4(),
			foodId: uuidv4(),
			finishTime: new Date(Date.now())
		};

		cooker.addFinishedFood(finishedFood);
		cooker.addFinishedFood(finishedFood);

		expect(cooker.getFinishedFoods()).toHaveLength(2);
	});

	it('add a finished food', () => {
		const cooker = Cooker.new(name.findName(), new Email(internet.email()), internet.password());
		const finishedFood: FinishedFood = {
			orderId: uuidv4(),
			foodId: uuidv4(),
			finishTime: new Date(Date.now())
		};

		cooker.addFinishedFood(finishedFood);
		expect(cooker.getFinishedFoods()).toHaveLength(1);

		cooker.addFinishedFood(finishedFood);
		expect(cooker.getFinishedFoods()).toHaveLength(2);

		expect(cooker.getFinishedFoods()).toStrictEqual([finishedFood, finishedFood]);
	});

	// it('add a invalid finished food', () => {});

});
