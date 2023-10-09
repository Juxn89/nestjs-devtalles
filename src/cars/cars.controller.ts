import {
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
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
}
