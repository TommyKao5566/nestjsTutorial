import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
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

  async queryWithSQL(): Promise<{ data: Partial<Pokemon>[]; total: number }> {
    const sql = `
      SELECT id, name, attack, special_attack, COUNT(*) OVER() AS total
      FROM pokemon
      WHERE type1 IN ('Fire', 'Water', 'Electric')
      ORDER BY special_attack DESC, attack DESC
    `;

    const result = await this.pokemonRepository.query(sql);

    return {
      data: result,
      total: result.length > 0 ? result[0].total : 0,
    };
  }

  async queryWithQB(): Promise<{ data: Partial<Pokemon>[]; total: number }> {
    const [data, total] = await this.pokemonRepository
      .createQueryBuilder('pokemon')
      .select(['pokemon.id', 'pokemon.name', 'pokemon.attack', 'pokemon.special_attack'])
      .where('pokemon.type1 IN (:...types)', { types: ['Fire', 'Water', 'Electric'] })
      .orderBy('pokemon.special_attack', 'DESC') // 先按照 special_attack 排序
      .addOrderBy('pokemon.attack', 'DESC') // 再按照 attack 排序
      .getManyAndCount(); // 回傳 [資料, 總筆數]

    return { data, total };
  }

  async queryWithFind(): Promise<{ data: Partial<Pokemon>[]; total: number }> {
    const whereCondition = { type1: In(['Fire', 'Water', 'Electric']) };
  
    const [data, total] = await Promise.all([
      this.pokemonRepository.find({
        select: ['id', 'name', 'attack', 'specialAttack'],
        where: whereCondition,
        order: { specialAttack: 'DESC', attack: 'DESC' },
      }),
      this.pokemonRepository.count({ where: whereCondition }),
    ]);
  
    return { data, total };
  }

  async find(): Promise<Pokemon[] | null> {
    const res = await this.pokemonRepository.find();

    return res;
  }

  async findOne(id: number): Promise<Pokemon | null> {
    const res = await this.pokemonRepository.findOne({ where: { id: id } });

    return res;
  }

  async create(data: Partial<Pokemon>): Promise<Pokemon> {
    const newAnnouncement = this.pokemonRepository.create(data);
    return await this.pokemonRepository.save(newAnnouncement);
  }

  async update(id: number, data: Partial<Pokemon>): Promise<Pokemon | null> {
    await this.pokemonRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pokemonRepository.delete(id);
  }
}
