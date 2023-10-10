import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v5 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
	private brands: Brand[] = [
		{
			id: uuid.URL,
			name: 'Toyota',
			createdAt: new Date().getTime(),
		},
	];

	create(createBrandDto: CreateBrandDto) {
		const brand: Brand = {
			id: uuid.URL,
			name: createBrandDto.name.toLocaleLowerCase(),
			createdAt: new Date().getTime(),
		};

		this.brands.push(brand);

		return brand;
	}

	findAll() {
		return this.brands;
	}

	findOne(id: string) {
		const brand = this.brands.find(brand => brand.id === id);

		if (!brand) throw new NotFoundException(`Brand with ${id} not found!`);

		return brand;
	}

	update(id: string, updateBrandDto: UpdateBrandDto) {
		let currentBrand = this.findOne(id);

		this.brands = this.brands.map(brand => {
			if (brand.id === id) {
				currentBrand.updatedAt = new Date().getTime();
				currentBrand = { ...currentBrand, ...updateBrandDto };
			}
			return brand;
		});

		return currentBrand;
	}

	remove(id: string) {
		this.brands = this.brands.filter(brand => brand.id !== id);
		return this.brands;
	}
}
