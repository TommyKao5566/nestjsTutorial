import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from 'typeorm-model/Pokemon';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('list')
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  // http://localhost:3000/pokemon?id=1
  @Get()
  findPokemonByQueryId(@Query('id') id?: number) {
    if (!id) {
      throw new BadRequestException('id required!');
    }

    return this.pokemonService.findOne(id);
  }

  // http://localhost:3000/pokemon/findOne/:pokemon_id
  @Post('findOne/:pokemon_id')
  findPokemonById(@Param('pokemon_id') pokemon_id: number) {
    return this.pokemonService.findOne(pokemon_id);
  }

  // http://localhost:3000/pokemon/list
  @Post('list')
  findAllPokemon(): Promise<Pokemon[] | null> {
    return this.pokemonService.find();
  }

  // http://localhost:3000/pokemon/create
  @Post('create')
  createPokemon(@Body() data: Partial<Pokemon>): Promise<Pokemon> {
    return this.pokemonService.create(data);
  }

  // http://localhost:3000/pokemon/update
  @Post('update')
  updatePokemon(@Body() data: Partial<Pokemon>): Promise<UpdateResult> {

    if (!data.id) {
      throw new BadRequestException('id required!');
    }

    return this.pokemonService.update(data.id,data);
  }

  // http://localhost:3000/pokemon/delete
  @Post('delete')
  deletePokemon(@Body() data: Partial<Pokemon>): Promise<DeleteResult> {

    if (!data.id) {
      throw new BadRequestException('id required!');
    }

    return this.pokemonService.remove(data.id);
  }
}
