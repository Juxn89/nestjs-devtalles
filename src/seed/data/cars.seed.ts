import { v5 as uuid } from 'uuid';
import { ICar } from 'src/cars/interfaces/car.interface';

export const CARS_SEED: ICar[] = [
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
		brand: 'Hyundai',
		model: 'Elantra',
	},
	{
		id: uuid.URL,
		brand: 'Jeep',
		model: 'Cherokie',
	},
];
