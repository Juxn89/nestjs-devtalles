import { Injectable } from '@nestjs/common';

import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { User } from '../auth/entities/users.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SeedService {
	constructor(
		private readonly productService: ProductsService,
		private readonly userService: AuthService
	) {}

  async runSeed() {
		await this.deleteTables();
		const user = await this.seedUser();
		await this.seedProduct(user);

		return 'Seed executed';
  }
	
	private async seedProduct(user: User) {
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

	private async deleteTables() {
		await this.productService.deleteAllProducts();
		await this.userService.deleteUsers();
	}

	private async seedUser() {
		const seedUsers = initialData.users;
		const users = [];

		seedUsers.forEach(user => {
			users.push(this.userService.create(user))
		})

		await Promise.all(users);
		return users[0];
	}
}
