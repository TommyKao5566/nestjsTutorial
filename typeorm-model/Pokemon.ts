import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("pokemon", { schema: "mydb" })
export class Pokemon {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "type1", length: 20 })
  type1: string;

  @Column("varchar", { name: "type2", nullable: true, length: 20 })
  type2: string | null;

  @Column("int", { name: "hp" })
  hp: number;

  @Column("int", { name: "attack" })
  attack: number;

  @Column("int", { name: "defense" })
  defense: number;

  @Column("int", { name: "special_attack" })
  specialAttack: number;

  @Column("int", { name: "special_defense" })
  specialDefense: number;

  @Column("int", { name: "speed" })
  speed: number;

  @Column("int", { name: "total", nullable: true })
  total: number | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;
}
