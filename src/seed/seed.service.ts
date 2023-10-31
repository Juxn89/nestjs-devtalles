import { Injectable } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
	constructor(
		private readonly productService: ProductsService
	) {}

  async runSeed() {
		await this.ProductSeed();

		return 'Seed executed';
  }
	
	private async ProductSeed() {
		await this.productService.deleteAllProducts();
		await this.BulkProductSeed()
	}

	private async BulkProductSeed() {
		const seedProducts = initialData.products;
		let productsToSave = [];

		seedProducts.forEach(product => {
			productsToSave.push(this.productService.create(product))
		})

		await Promise.allSettled(productsToSave)
	}
}
