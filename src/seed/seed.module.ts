import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonsModule } from 'src/commons/commons.module';

@Module({
  imports: [PokemonModule, CommonsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
