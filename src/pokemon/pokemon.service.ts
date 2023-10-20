import { Model, isValidObjectId } from 'mongoose';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
	) {}

	async create(createPokemonDto: CreatePokemonDto) {
		try {
			console.log(createPokemonDto);
			const pokemon = await this.pokemonModel.create(createPokemonDto);
			return pokemon;
		} catch (error) {
			this.handleException(error);
		}
	}

	findAll() {
		return `This action returns all pokemon`;
	}

	async findOne(searchTerm: string) {
		let pokemon: Pokemon;

		if (!isNaN(+searchTerm)) {
			pokemon = await this.pokemonModel.findOne({ number: searchTerm });
		}

		if (isValidObjectId(searchTerm)) {
			pokemon = await this.pokemonModel.findOne({ _id: searchTerm });
		}

		if (!pokemon) {
			pokemon = await this.pokemonModel.findOne({
				name: searchTerm.toLowerCase().trim(),
			});
		}

		if (!pokemon)
			throw new NotFoundException(`Pokemon with name, id or number not found!`);

		return pokemon;
	}

	async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
		try {
			const pokemon = await this.findOne(searchTerm);
			if (updatePokemonDto.name)
				updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

			await pokemon.updateOne(updatePokemonDto, { new: true });
			return { ...pokemon.toJSON(), ...updatePokemonDto };
		} catch (error) {
			this.handleException(error);
		}
	}

	remove(id: number) {
		return `This action removes a #${id} pokemon`;
	}

	private handleException(error: any) {
		if (error.code === 11000) {
			throw new BadRequestException(
				`Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
			);
		}
		console.log(error);
		throw new InternalServerErrorException(
			`Can't process pokemon - check server log`,
		);
	}
}
