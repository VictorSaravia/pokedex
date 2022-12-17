import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await Promise.resolve(this.pokemonModel.findOne({ no: term }));
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await Promise.resolve(this.pokemonModel.findById(term));
    }
    if (!pokemon) {
      pokemon = await Promise.resolve(
        this.pokemonModel.findOne({
          name: term.toLocaleLowerCase().trim(),
        }),
      );
    }
    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }
      await Promise.resolve(pokemon.updateOne(updatePokemonDto, { new: true }));
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    const result = await Promise.resolve(
      this.pokemonModel.findByIdAndDelete(id),
    );
    if (!result) {
      throw new BadRequestException(`id ${id} don't exist in DB`);
    }
  }

  private handleErrors(error: any) {
    console.log(error);
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exist in DB : ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(`Error : ${JSON.stringify(error)}`);
  }
}
