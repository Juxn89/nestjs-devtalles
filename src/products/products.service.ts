import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import DbErrorsCode from 'src/common/dbCodeErrors';

@Injectable()
export class ProductsService {
	private readonly logger = new Logger('ProductsService');

	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

  async create(createProductDto: CreateProductDto) {
		try {
			const product = this.productRepository.create(createProductDto);
			await this.productRepository.save(product);

			return product;
		} catch (error) {
			this.handleDdExceptions(error)
		}
  }

  async findAll() {
		const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
		const product = await this.productRepository.findOneBy({ id });

		if(!product) throw new NotFoundException(`Product with ID '${id}' not found`)

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
		const product = await this.productRepository.delete({ id });

		if(product.affected === 0) throw new NotFoundException(`Product with ID '${id}' not found`)

    return `Product with ID '${id}' deleted`;
  }

	private handleDdExceptions (error: any) {
		if(error.code === DbErrorsCode.DUPLICATE_KEY_CONSTRAINT)
			throw new BadRequestException(error.detail)

		this.logger.error(`Unexpected error, check server logs`);
		throw new InternalServerErrorException('Heeeelp! :(')
	}
}
