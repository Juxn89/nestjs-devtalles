export const pokemonsIds = [1, 2, 3, 4, 5, 6]

pokemonsIds.push('asdf')

console.log(pokemonsIds)

interface IPokemon {
	id: number,
	name: string,
	age?: number
}

export const charmeleon: IPokemon = {
	id: 1,
	name: 'Charmeleon'
}

export const charizard: IPokemon = {
	id: 1,
	name: 'Charmeleon',
	age: 10
}

export const pokemons: IPokemon[] = []
pokemons.push(charmeleon, charizard)