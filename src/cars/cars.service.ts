import { Injectable } from '@nestjs/common';

export interface ICars {
	id: number;
	brand: string;
	model: string;
}

@Injectable()
export class CarsService {
	private cars: ICars[] = [
		{
			id: 1,
			brand: 'Toyota',
			model: 'Corolla',
		},
		{
			id: 2,
			brand: 'Honda',
			model: 'Civic',
		},
		{
			id: 3,
			brand: 'Jeep',
			model: 'Cherokee',
		},
	];

	findAll() {
		return this.cars;
	}

	findByID(ID: number) {
		return this.cars.find(car => car.id === ID);
	}
}
