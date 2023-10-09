import { IsString, MinLength, IsUUID, IsOptional } from 'class-validator';
import { ICar } from '../interfaces/car.interface';

export class UpdateCarDTO implements ICar {
	@IsString()
	@IsUUID()
	@IsOptional()
	readonly id: string;

	@IsString({ message: 'brand is mandatory' })
	@IsOptional()
	readonly brand: string;

	@IsString({ message: 'model is mandatory' })
	@IsOptional()
	@MinLength(3)
	readonly model: string;
}
