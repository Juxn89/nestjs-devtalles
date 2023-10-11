import { v5 as uuid } from 'uuid';
import { Brand } from 'src/brands/entities/brand.entity';

export const BRANDS_SEED: Brand[] = [
	{
		id: uuid.URL,
		name: 'Volvo',
		createdAt: new Date().getTime(),
	},
	{
		id: uuid.URL,
		name: 'Toyota',
		createdAt: new Date().getTime(),
	},
	{
		id: uuid.URL,
		name: 'Honda',
		createdAt: new Date().getTime(),
	},
	{
		id: uuid.URL,
		name: 'Jeep',
		createdAt: new Date().getTime(),
	},
];
