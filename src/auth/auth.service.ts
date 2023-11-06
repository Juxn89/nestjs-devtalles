import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import dbCodeErrors from 'src/common/dbCodeErrors';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) 
		private readonly userRepository: Repository<User>
	){}

  async create(createUserDto: CreateUserDto) {
		try {
			const user = await this.userRepository.create(createUserDto)
			await this.userRepository.save(user);

			return user;
		} catch (error) {
			this.handleDbError(error);
		}
  }

	private handleDbError = (error: any): never => {
		if(error.code === dbCodeErrors.DUPLICATE_KEY_CONSTRAINT) {
			throw new BadRequestException(`${ error.detail }`)
		}

		console.error(error)
		throw new InternalServerErrorException(`Please check server logs`);
	}
}
