import { Controller, Get, Param, Post } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('list')
  getAllPokemon() {
    return this.pokemonService.getAllPokemon()
  }
  
  @Get()
  findPokemonByName(@Param('name') name: string) {
    return this.pokemonService.findOne(name)
  }
}
