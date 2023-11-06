import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { Product, ProductImage } from './entities/';
import DbErrorsCode from 'src/common/dbCodeErrors';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
	private readonly logger = new Logger('ProductsService');

	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,

		@InjectRepository(ProductImage)
		private readonly productImageRepository: Repository<ProductImage>,

		private readonly dataSource: DataSource
	) {}

  async create(createProductDto: CreateProductDto) {
		try {
			const { images = [], ...newProduct } = createProductDto;
			const product = this.productRepository.create({
				...newProduct, 
				images: images.map(image => this.productImageRepository.create({ url: image }))
			});

			await this.productRepository.save(product);

			return this.ProductPlain(product)

		} catch (error) {
			this.handleDdExceptions(error)
		}
  }

  async findAll(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto;

		const products = await this.productRepository
			.find({
				take: limit,
				skip: offset,
				relations:{
					images: true
				}
			})

    return products.map(product => ({
			...product,
			images: product.images.map(image => image.url)
		}));
  }

  async findOne(searchTerm: string) {
		let product: Product;

		if(isUUID(searchTerm)) {
			product = await this.productRepository.findOneBy({ id: searchTerm });
		}
		else {
			const queryBuilder = this.productRepository.createQueryBuilder('prod');
			product = await queryBuilder
								.where(
									'UPPER(title) =:title or slug =:slug', 
									{ 
										title: searchTerm.toUpperCase(), 
										slug: searchTerm.toLowerCase() 
									}
								)
								.leftJoinAndSelect('prod.images', 'prodImages')
								.getOne();
		}

		if(!product) throw new NotFoundException(`Product with ID '${searchTerm}' not found`)

    return this.ProductPlain(product)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
		const { images, ...updateProduct } = updateProductDto

		const product = await this.productRepository.preload({
			id,
			...updateProduct
		})

		if(!product)
			throw new NotFoundException(`Product with ID "${id}" not found`);

		const queryRunner = this.dataSource.createQueryRunner()
		await queryRunner.connect()
		await queryRunner.startTransaction()

		try {
			if(images) {
				await queryRunner.manager.delete(ProductImage, { product: { id } })
				product.images = images.map(image => this.productImageRepository.create({ url: image }))
			}
			else {
				product.images = await this.productImageRepository.findBy({ product: { id } })
			}

			await queryRunner.manager.save(product)

			await queryRunner.commitTransaction()
			await queryRunner.release()

			return this.ProductPlain(product);

		} catch (error) {
			await queryRunner.rollbackTransaction()
			await queryRunner.release()
			this.handleDdExceptions(error)
		}
  }

  async remove(id: string) {
		const product = await this.productRepository.delete({ id });

		if(product.affected === 0) throw new NotFoundException(`Product with ID '${id}' not found`)

    return `Product with ID '${id}' deleted`;
  }

	async deleteAllProducts() {
		const query = this.productRepository.createQueryBuilder('product')

		try {
			return await query
				.delete()
				.where({})
				.execute()

		} catch (error) {
			this.handleDdExceptions(error)
		}
	}

	private handleDdExceptions (error: any) {
		if(error.code === DbErrorsCode.DUPLICATE_KEY_CONSTRAINT)
			throw new BadRequestException(error.detail)

		this.logger.error(`Unexpected error, check server logs`);
		throw new InternalServerErrorException('Heeeelp! :(')
	}

	private ProductPlain(product: Product) {
		return {
			...product,
			images: product.images.map(image => image.url)
		}
	}
}
