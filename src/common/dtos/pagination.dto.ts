import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
	@IsOptional()
	@IsInt()
	@IsPositive()
	@Type( () => Number )
	@ApiProperty({  default: 10, description: 'How many rows do you need', required: false })
	limit?: number;
	
	@IsOptional()
	@IsInt()
	@Min(0)	
	@Type( () => Number )
	@ApiProperty({  default: 0, description: 'How many rows do you want to skip', required: false })
	offset?: number;
}