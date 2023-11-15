import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_POSTGRES_HOST,
			port: +process.env.DB_POSTGRES_PORT,
			database: process.env.DB_POSTGRES_NAME,
			username: process.env.DB_POSTGRES_USER,
			password: process.env.DB_POSTGRES_PASS,
			autoLoadEntities: true,
			synchronize: true
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public')
		}),
		ProductsModule,
		CommonModule,
		FilesModule,
		SeedModule,
		AuthModule,
		MessagesWsModule,
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
