import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	@Get()
	getAllCars() {
		return this.carsService.findAll();
	}

	@Get(':id')
	getCarById(@Param('id', ParseIntPipe) id: number) {
		const car = this.carsService.findByID(id);

		if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

		return car;
	}

	@Post()
	saveCar(@Body() payload: any) {
		return payload;
	}

	@Put(':id')
	updateCar(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
		return payload;
	}

	@Patch(':id')
	updateModel(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
		return payload;
	}

	@Delete(':id')
	deleteModel(@Param('id', ParseIntPipe) id: number) {
		return {
			msg: 'Delete',
			id,
		};
	}
}
