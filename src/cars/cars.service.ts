import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v5 as uuid } from 'uuid';
import { ICar } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto/';

@Injectable()
export class CarsService {
	private cars: ICar[] = [
		{
			id: uuid.URL,
			brand: 'Toyota',
			model: 'Corolla',
		},
		{
			id: uuid.URL,
			brand: 'Honda',
			model: 'Civic',
		},
		{
			id: uuid.URL,
			brand: 'Jeep',
			model: 'Cherokee',
		},
	];

	findAll() {
		return this.cars;
	}

	findByID(id: string) {
		const car = this.cars.find(car => car.id === id);

		if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

		return car;
	}

	create(car: CreateCarDTO) {
		const newCar: ICar = {
			id: uuid.URL,
			...car,
		};

		this.cars.push(newCar);
		return newCar;
	}

	update(id: string, car: UpdateCarDTO) {
		let currentCar = this.findByID(id);

		if (car.id && car.id !== id) throw new BadRequestException(`Car ID is not valid`);

		this.cars = this.cars.map(item => {
			if (item.id === id) {
				currentCar = { ...currentCar, ...car, id };
				return currentCar;
			}
			return item;
		});

		return currentCar;
	}

	delete(id: string) {
		const car = this.findByID(id);

		this.cars = this.cars.filter(car => car.id !== id);

		return car;
	}
}
