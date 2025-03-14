import { BadRequestException, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('list')
  getAllPokemon() {
    return this.pokemonService.getAllPokemon();
  }

  // http://localhost:3000/pokemon/Pikachu
  @Get(':id')
  findPokemonByName(@Param('id') id: number) {
    return this.pokemonService.findOne(id);
  }
  
  // http://localhost:3000/pokemon?name=Pikachu
  @Get()
  findPokemonByQueryName(@Query('id') id?: number) {

    if(!id) {
        throw new BadRequestException('id required!');
    }

    return this.pokemonService.findOne(id);
  }
}
