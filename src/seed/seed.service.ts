import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
	constructor(private pokemonService: PokemonService) {}

	private readonly axios: AxiosInstance = axios;
	private readonly conf = config();

	async executeSeed() {
		const { data } = await this.axios.get<PokeResponse>(
			`${this.conf.pokeApiUrl}pokemon?limit=10`,
		);

		await data.results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const pokemonNumber: number = +segments.at(-2);

			console.log({ name, pokemonNumber });
			await this.pokemonService.create({ name, number: pokemonNumber });
		});

		return 'Seed executed!';
	}
}
