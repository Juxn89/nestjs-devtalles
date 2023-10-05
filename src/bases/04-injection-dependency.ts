import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
import { PokeApiAdapter } from '../api/pokeapi.adapter';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  
    constructor(
        public readonly id: number, 
        public name: string,
        // inyectar dependencias
				private readonly http: PokeApiAdapter
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
export const charmander = new Pokemon( 4, 'Charmander', pokeApiAdapter);

charmander.getMoves();