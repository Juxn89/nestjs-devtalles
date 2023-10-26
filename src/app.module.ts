import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
		})
	],
  controllers: [],
  providers: [],
})
export class AppModule {}
