import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import DbErrorsCode from 'src/common/dbCodeErrors';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

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

  async findAll(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto;

		const products = await this.productRepository
			.find({
				take: limit,
				skip: offset
			})

    return products;
  }

  async findOne(searchTerm: string) {
		let product: Product;

		if(isUUID(searchTerm)) {
			product = await this.productRepository.findOneBy({ id: searchTerm });
		}
		else {
			const queryBuilder = this.productRepository.createQueryBuilder();
			product = await queryBuilder
								.where(
									'UPPER(title) =:title or slug =:slug', 
									{ 
										title: searchTerm.toUpperCase(), 
										slug: searchTerm.toLowerCase() 
									}
								)
								.getOne();
		}

		if(!product) throw new NotFoundException(`Product with ID '${searchTerm}' not found`)

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
		const product = await this.productRepository.preload({
			id,
			...updateProductDto
		})

		if(!product)
			throw new NotFoundException(`Product with ID "${id}" not found`);

		try {
			await this.productRepository.save(product);
		} catch (error) {
			this.handleDdExceptions(error)
		}

    return product;
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
