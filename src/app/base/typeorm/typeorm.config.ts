import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mariadb', // 你的資料庫類型（MySQL, PostgreSQL, SQLite, etc.）
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '123456',
  database: process.env.DATABASE_NAME || 'pokemon',
  entities: ['dist/**/output/entities/*{.ts,.js}'],
  extra: {
    connectionLimit: 10, // ✅ MariaDB 需要手動指定連線池大小
  },
  /* 
  在 synchronize: true 時，TypeORM 會試圖自動更新結構，可能導致錯誤。
  ⚠️ 開發階段可用，正式環境請設 `false
  */
};