import { Controller, Get, Param } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	@Get()
	getAllCars() {
		return this.carsService.findAll();
	}

	@Get(':id')
	getCarById(@Param('id') id: string) {
		const index = Number(id);

		if (isNaN(index)) return { msg: 'ID parameter must be a number' };
		if (index > this.carsService.findAll().length)
			return { msg: `Car with ID ${index} not found` };

		return this.carsService.findByID(index);
	}
}
