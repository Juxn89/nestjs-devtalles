import { Controller, Post, Body, Get, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { User } from './entities/users.entity';
import { CreateUserDto, LoginUserDto } from './dto/';
import { Auth, GetRawHeaders, GetUser, RoleProtected} from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

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
		@Req() request: Express.Request,
		@GetUser() user: User,
		@GetUser('email') userEmail: User,
		@GetRawHeaders() rawHeaders,
		@Headers() headers: IncomingHttpHeaders
	) {
		return {
			ok: true,
			menssage: 'Hi from a private route',
			user,
			userEmail,
			rawHeaders,
			headers
		}
	}

	@Get('private2')
	@RoleProtected(ValidRoles.superUser)
	@UseGuards( AuthGuard(), UserRoleGuard )
	privateRoute2(
		@GetUser() user: User,
	) {
		return {
			ok: true,
			user
		}
	}

	@Get('private3')
	@Auth(ValidRoles.admin)
	privateRoute3(
		@GetUser() user: User,
	) {
		return {
			ok: true,
			user
		}
	}
}
