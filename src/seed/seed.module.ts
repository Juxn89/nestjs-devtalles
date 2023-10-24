import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from '../pokemon/pokemon.module';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { IHttpAdapter } from '../common/interfaces/http-adapter.interface';

@Module({
	controllers: [SeedController],
	providers: [SeedService, { provide: IHttpAdapter, useClass: AxiosAdapter }],
	imports: [PokemonModule],
})
export class SeedModule {}
