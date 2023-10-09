import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	@Get()
	getAllCars() {
		return this.carsService.findAll();
	}

	@Get(':id')
	getCarById(@Param('id', new ParseUUIDPipe({ version: '5' })) id: string) {
		const car = this.carsService.findByID(id);

		if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

		return car;
	}

	@Post()
	@UsePipes(ValidationPipe)
	saveCar(@Body() createCar: CreateCarDTO) {
		return this.carsService.create(createCar);
	}

	@Put(':id')
	updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() payload: any) {
		return this.carsService.update(id, payload);
	}

	@Patch(':id')
	updateModel(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateCarDTO) {
		return payload;
	}

	@Delete(':id')
	deleteModel(@Param('id', ParseUUIDPipe) id: string) {
		return this.carsService.delete(id);
	}
}
