import { IsString, MinLength } from 'class-validator';
import { ICarBase } from '../interfaces/car.interface';

export class CreateCarDTO implements ICarBase {
	@IsString({ message: 'brand is mandatory' })
	readonly brand: string;

	@IsString({ message: 'model is mandatory' })
	@MinLength(3)
	readonly model: string;
}
