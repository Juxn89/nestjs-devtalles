import { Injectable } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/users.entity';

@Injectable()
export class SeedService {
	constructor(
		private readonly productService: ProductsService
	) {}

  async runSeed(user: User) {
		await this.ProductSeed(user);

		return 'Seed executed';
  }
	
	private async ProductSeed(user: User) {
		await this.productService.deleteAllProducts();
		await this.BulkProductSeed(user)
	}

	private async BulkProductSeed(user: User) {
		const seedProducts = initialData.products;
		let productsToSave = [];

		seedProducts.forEach(product => {
			productsToSave.push(this.productService.create(product, user))
		})

		await Promise.allSettled(productsToSave)
	}
}
