import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { config } from './config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [config] }),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		MongooseModule.forRoot(config().mongoDB),
		PokemonModule,
		CommonModule,
		SeedModule,
	],
})
export class AppModule {}
