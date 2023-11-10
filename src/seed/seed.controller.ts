import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SeedService } from './seed.service';
import { Auth, GetUser } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { User } from '../auth/entities/users.entity';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
	@Auth(ValidRoles.admin)
  executeSeed(@GetUser() user: User) {
    return this.seedService.runSeed(user);
  }
}
