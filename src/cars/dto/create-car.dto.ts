import { IsString } from 'class-validator';
import { ICarBase } from '../interfaces/car.interface';

export class CreateCarDTO implements ICarBase {
	@IsString({ message: 'brand is mandatory' })
	readonly brand: string;
	@IsString({ message: 'model is mandatory' })
	readonly model: string;
}
