import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/';
import { GetUser } from './decorators/get-user.decocrator';
import { User } from './entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

	@Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

	@Get('private')
	@UseGuards(AuthGuard())	
	privateRoute(
		@GetUser() user: User,
		@GetUser('email') userEmail: User
	){
		return {
			ok: true,
			menssage: 'Hi from a private route',
			user,
			userEmail
		}
	}
}
