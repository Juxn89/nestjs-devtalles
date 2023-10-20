import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ValidationPipe,
	UsePipes,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('v2/pokemon')
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) {}

	@Post()
	@UsePipes(ValidationPipe)
	@HttpCode(HttpStatus.OK)
	create(@Body() createPokemonDto: CreatePokemonDto) {
		createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
		return this.pokemonService.create(createPokemonDto);
	}

	@Get()
	findAll() {
		return this.pokemonService.findAll();
	}

	@Get(':searchTerm')
	findOne(@Param('searchTerm') searchTerm: string) {
		return this.pokemonService.findOne(searchTerm);
	}

	@Patch(':searchTerm')
	// eslint-disable-next-line prettier/prettier
	update(@Param('searchTerm') searchTerm: string, @Body() updatePokemonDto: UpdatePokemonDto) {
		return this.pokemonService.update(searchTerm, updatePokemonDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.pokemonService.remove(+id);
	}
}
