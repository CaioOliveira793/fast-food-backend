import { ActorRepository } from './ActorRepository';
import { Cooker, FinishedFood } from '@entities/Cooker';

export abstract class CookerRepository extends ActorRepository<Cooker> {
	public abstract getFinishedFoods(cookerId: string): Promise<FinishedFood>;
	public abstract updateFinishedFoods(cooker: Cooker): Promise<void>;
	public abstract insertFinishedFoods(cooker: Cooker, finishedFood: FinishedFood): Promise<Cooker>;
}
