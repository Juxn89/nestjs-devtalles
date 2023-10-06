const MyDecorator = () => {
	return (target: Function) => {
		return NewPokemon
		// console.log(target)
	}
}

export class NewPokemon {
	constructor(
		public readonly id: number,
		public name: string
	) { }

	scream(){
		console.log(`${ this.name } (scream) | NewPokemon!`)		
	}

	speak(){
		console.log(`${ this.name } (speak) | NewPokemon!`)			
	}
}

@MyDecorator()
export class Pokemon {
	constructor(
		public readonly id: number,
		public name: string
	) { }

	scream(){
		console.log(`${ this.name } (scream)!`)		
	}

	speak(){
		console.log(`${ this.name } (speak)!`)			
	}
}

export const charmander = new Pokemon(1, 'Charmander')
charmander.scream()
charmander.speak()