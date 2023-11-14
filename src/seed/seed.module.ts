import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from '../products/products.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
	imports: [ ProductsModule, AuthModule ]
})
export class SeedModule {}
