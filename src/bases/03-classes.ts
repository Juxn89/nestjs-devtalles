export class Pokemon {
	public id: number = 0
	public name: string
	public readonly age: number = 10

	constructor(id: number, name: string) {
		this.id = id
		this.name = name

		console.log('Constructor called')
	}

	get imageURL(): string {
		return `http://pokemon.com/${this.id}`
	}

	private scream() {
		console.log(`${ this.name.toUpperCase() }!!!`)
	}

	speak() {
		console.log(`${ this.name } ${this.age}`)
		this.scream()
	}
}

export class PokemonShortWay {
	constructor(
		public id: number, 
		public name: string) { }
}

const charmander = new Pokemon(0, 'Charmander')
// charmander.scream()
charmander.speak()