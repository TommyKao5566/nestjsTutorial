import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Pokemon } from 'typeorm-model/Pokemon';

@Injectable()
export class PokemonService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async getAllPokemon() {
    return this.dataSource.query('SELECT * FROM pokemon');
  }

  async findOne(name: string): Promise<Pokemon | null> {
    const res = await this.pokemonRepository.findOne({ where: { name: name } });

    return res;
  }
}
