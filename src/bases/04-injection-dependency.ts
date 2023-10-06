import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
import { PokeApiAdapter, PokeApiFetchAdapter } from '../api/pokeapi.adapter';
import { IHttpAdapter } from '../interfaces/httpAdapter.interface';
import { charizard } from './02-objects';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  
    constructor(
        public readonly id: number, 
        public name: string,
        // inyectar dependencias
				private readonly http: IHttpAdapter
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        const { moves } = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log( moves );
        
        return moves;
    }

}

const pokeApiAdapter = new PokeApiAdapter()
const pokeApiFetchAdapter = new PokeApiFetchAdapter()

export const charmander = new Pokemon( 4, 'Charmander', pokeApiAdapter);
export const charizard2 = new Pokemon( 4, 'Charmander', pokeApiFetchAdapter);

charmander.getMoves();
charizard2.getMoves();