import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
		if (id > this.carsService.findAll().length)
			return { msg: `Car with ID ${id} not found` };

		return this.carsService.findByID(id);
	}
}
