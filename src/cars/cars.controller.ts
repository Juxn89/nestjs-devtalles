import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
	private cars: string[] = ['Toyota', 'Hyundai', 'Honda'];

	@Get()
	getAllCars() {
		return ['Toyota', 'Hyundai'];
	}

	@Get(':id')
	getCarById(@Param('id') id: string) {
		const index = Number.parseInt(id);

		if (isNaN(index)) return { msg: 'ID parameter must be a number' };
		if (index >= this.cars.length)
			return { msg: `Car with ID ${index} not found` };

		return this.cars[index];
	}
}
