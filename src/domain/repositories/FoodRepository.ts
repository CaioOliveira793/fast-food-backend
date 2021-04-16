import { URL } from 'url';

import { Repository } from '@repositories/Repository';
import { Food } from '@entities/Food/FoodEntity';

export abstract class FoodRepository extends Repository<Food> {
	public abstract getName(foodId: string): Promise<string>;
	public abstract updateName(food: Food): Promise<void>;

	public abstract getRawPrice(foodId: string): Promise<number>;
	public abstract updateRawPrice(food: Food): Promise<void>;

	public abstract getDiscount(foodId: string): Promise<number>;
	public abstract updateDiscount(food: Food): Promise<void>;

	public abstract getImageAddress(foodId: string): Promise<URL>;
	public abstract updateImageAddress(food: Food): Promise<void>;
	public abstract deleteImageAddress(food: Food): Promise<Food>;
}
