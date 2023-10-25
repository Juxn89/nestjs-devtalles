import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, isValidObjectId } from 'mongoose';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';

import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
		private readonly configService: ConfigService,
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

	async bulkCreate(createPokemonsDto: CreatePokemonDto[]) {
		try {
			console.log(createPokemonsDto);
			const result = await this.pokemonModel.insertMany(createPokemonsDto);
			return result;
		} catch (error) {
			this.handleException(error);
		}
	}

	async findAll(filters: PaginationDto) {
		const defaultPokeAPIDefaultLimit: number =
			this.configService.get<number>('POKEAPI_LIMIT');

		const { limit = defaultPokeAPIDefaultLimit, offset = 0 } = filters;

		return this.pokemonModel
			.find()
			.limit(limit)
			.skip(offset)
			.sort({ number: 1 })
			.select('-__v');
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

	async remove(id: string) {
		// const pokemon = await this.findOne(id);
		// await pokemon.deleteOne();
		const { deletedCount } = await this.pokemonModel.deleteOne({ id: id });

		if (deletedCount === 0) {
			throw new NotFoundException(`Pokemon with id "${id}" not found`);
		}

		return;
	}

	async removeAll() {
		await this.pokemonModel.deleteMany();
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
