import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import { AxiosAdapter } from './common/adapters/axios.adapter';
import { IHttpAdapter } from './common/interfaces/http-adapter.interface';
import { config } from './config';
import { JoiValidationSchema } from './config/joi.validations';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			validationSchema: JoiValidationSchema,
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
		PokemonModule,
		CommonModule,
		SeedModule,
	],
	providers: [{ provide: IHttpAdapter, useClass: AxiosAdapter }],
})
export class AppModule {}
