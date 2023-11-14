import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/users.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

	@ApiProperty({
		example: '13c4e500-b527-476f-9be4-d5c4f3348f9f',
		description: 'Product ID',
		uniqueItems: true
	})
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({
		example: 'T-shirt teslo',
		description: 'Product title',
		uniqueItems: true
	})
	@Column('text', { unique: true })
	title: string

	@ApiProperty({
		example: 0,
		description: 'Product price'
	})
	@Column('numeric', { default: 0 })
	price: number

	@ApiProperty({
		example: 'Product\'s description',
		description: 'Description of product'
	})
	@Column({ type: 'text', nullable: true })
	description: string

	@ApiProperty()
	@Column('text', { unique: true})
	slug: string

	@ApiProperty()
	@Column('int', { default: 0 })
	stock: number

	@ApiProperty({
		example: ['M', 'XL', 'XLL'],
		description: 'Product size'
	})
	@Column('text', { array: true })
	sizes: string[]

	@ApiProperty()
	@Column('text')
	gender: string

	@ApiProperty()
	@Column('text', { array: true, default: [] })
	tags: string[]

	@ApiProperty()
	@OneToMany(
		() => ProductImage,
		productImage => productImage.product,
		{ cascade: true, eager: true }
	)
	images?: ProductImage[]

	@ManyToOne(
		() => User,
		(user) => user.product,
		{ eager: true }
	)
	user: User

	@BeforeInsert()
	@BeforeUpdate()
	checkSlugInsert() {
		if(!this.slug) {
			this.slug = this.title
		}

		this.slug = this.slug
			.toLowerCase()
			.replaceAll(' ', '_')
			.replaceAll("'", '')
	}
}
