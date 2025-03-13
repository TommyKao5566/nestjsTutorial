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
  @Get(':name')
  findPokemonByName(@Param('name') name: string) {
    return this.pokemonService.findOne(name);
  }
  
  // http://localhost:3000/pokemon?name=Pikachu
  @Get()
  findPokemonByQueryName(@Query('name') name?: string) {

    if(!name) {
        throw new BadRequestException('name required!');
    }

    return this.pokemonService.findOne(name);
  }
}
