import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { User } from './entities/users.entity';
import dbCodeErrors from 'src/common/dbCodeErrors';
import { CreateUserDto, LoginUserDto } from './dto/';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) 
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

  async create(createUserDto: CreateUserDto) {
		try {
			const { password, ...userData } = createUserDto

			const user = await this.userRepository.create({
				...userData,
				password: bcrypt.hashSync(password, 10)
			})
			await this.userRepository.save(user);

			delete user.password;

			return {
				...user,
				token: this.getJwtToken({ email: user.email })
			};

		} catch (error) {
			this.handleDbError(error);
		}
  }

	async login(loginUserDto: LoginUserDto) {
		try {
			const { email, password } = loginUserDto;
			const user = await this.userRepository.findOne({ 
				where: { email },
				select: { email: true, password: true }
			})

			if(!user)
				throw new NotFoundException(`Credentials are not valid`)
			
			if(!bcrypt.compareSync(password, user.password))
				throw new NotFoundException(`Credentials are not valid`)
			
			return {
				...user,
				token: this.getJwtToken({ email: user.email })
			};

		} catch (error) {
			this.handleDbError(error)
		}
	}

	private handleDbError = (error: any): never => {
		if(error.code === dbCodeErrors.DUPLICATE_KEY_CONSTRAINT)
			throw new BadRequestException(`${ error.detail }`)

		console.error(error)
		throw new InternalServerErrorException(`Please check server logs`);
	}

	private getJwtToken = (payload: IJwtPayload): string => {
		const token = this.jwtService.sign(payload);
		return token;
	}
}
