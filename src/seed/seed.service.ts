import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response';
import { Pokemon, PokemonDocument } from '../pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/commons/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    private readonly http: AxiosAdapter,
  ) {}

  async getSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const response = data.results.map<{ no: number; name: string }>(
      ({ name, url }) => {
        const arrayUrl = url.split('/');
        const no = +arrayUrl[arrayUrl.length - 2];
        return {
          no,
          name,
        };
      },
    );
    await this.pokemonModel.insertMany(response);
    return response;
  }
}
