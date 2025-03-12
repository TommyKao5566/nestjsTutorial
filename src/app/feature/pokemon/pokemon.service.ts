import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllPokemon() {
    return this.dataSource.query('SELECT * FROM pokemon');
  }
}
