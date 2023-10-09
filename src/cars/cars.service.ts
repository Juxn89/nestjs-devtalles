import { Injectable } from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { v5 as uuid } from 'uuid';

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

	findByID(ID: string) {
		return this.cars.find(car => car.id === ID);
	}
}
