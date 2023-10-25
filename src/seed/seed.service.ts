import { Injectable } from '@nestjs/common';
import { config } from '../config';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { IHttpAdapter } from '../common/interfaces/http-adapter.interface';

@Injectable()
export class SeedService {
	constructor(
		private pokemonService: PokemonService,
		private readonly httpAdapter: IHttpAdapter,
	) {}

	async executeSeed() {
		const { pokeApi } = config();

		await this.pokemonService.removeAll();

		const response = await this.httpAdapter.get<PokeResponse>(
			`${pokeApi.baseURL}pokemon?limit=${pokeApi.defaultLimit}`,
		);

		const pokemons = response.results.map(({ name, url }) => {
			const pokemonNumber: number = +url.split('/').at(-2);
			return { name, number: pokemonNumber };
		});

		await this.pokemonService.bulkCreate(pokemons);
		return 'Seed executed!';
	}
}
