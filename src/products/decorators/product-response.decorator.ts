import {applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Product } from '../entities';

export function ProductResponses() {
	return applyDecorators(
		ApiResponse({ status: 201, description: 'Product was created', type: Product }),
		ApiResponse({ status: 400, description: 'Bad request' }),
		ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
	)
}
