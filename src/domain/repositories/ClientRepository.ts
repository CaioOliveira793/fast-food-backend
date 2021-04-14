import { ActorRepository } from './ActorRepository';
import { Client } from '../entities/Client';

export abstract class ClientRepository extends ActorRepository<Client> {
	public abstract getFavoriteFoodsId(clientId: string): Promise<string[]>;
	public abstract updateFavoriteFoodsId(client: Client): Promise<void>;
	public abstract insertFavoriteFoodsId(client: Client, foodsId: string[]): Promise<Client>;
	public abstract deleteFavoriteFoodsId(client: Client, foodsId: string[]): Promise<Client>;

	public abstract getRequestedOrdersId(clientId: string): Promise<string[]>;
	public abstract updateRequestedOrdersId(client: Client): Promise<void>;
	public abstract insertRequestedOrderId(client: Client, orderId: string): Promise<Client>;
}
