import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Entity("users", { schema: "mydb" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "username", length: 100 })
  username: string;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", {
    name: "status",
    nullable: true,
    length: 10,
    default: () => "'inactive'",
  })
  status: string | null;

  @Column("enum", {
    name: "role",
    enum: ["admin", "user", "guest"],
    default: () => "'user'",
  })
  role: "admin" | "user" | "guest";

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("datetime", { name: "password_updated_at", nullable: true })
  passwordUpdatedAt: Date | null;

  @Column("varchar", { name: "refresh_token", nullable: true, length: 255 })
  refreshToken: string | null;

  @Column("varchar", { name: "ip", nullable: true, length: 45 })
  ip: string | null;
}
