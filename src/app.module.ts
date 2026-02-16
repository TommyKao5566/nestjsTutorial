import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/base/guard/jwt-auth.guard';
import { AppService } from './app.service';
import { typeOrmConfig } from './app/base/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './app/feature/pokemon/pokemon.module';
import { UsersModule } from './app/feature/user/users.module';
import { JwtStrategy } from './app/feature/user/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PokemonModule, UsersModule],
  controllers: [AppController],
  providers: [AppService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard }, // 全域 JWT 驗證
  ],
})
export class AppModule {}
