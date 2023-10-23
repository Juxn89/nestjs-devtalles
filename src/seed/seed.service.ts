import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
	private readonly axios: AxiosInstance = axios;
	private readonly conf = config();

	async executeSeed() {
		const { data } = await this.axios.get<PokeResponse>(
			`${this.conf.pokeApiUrl}pokemon?limit=5`,
		);

		data.results.forEach(({ name, url }) => {
			const segments = url.split('/');
			const pokemonNumber: number = +segments.at(-2);

			console.log({ name, pokemonNumber });
		});
		return data.results;
	}
}
