import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './app/base/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './app/feature/pokemon/pokemon.module';
import { UsersModule } from './app/feature/user/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PokemonModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
