import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './app/base/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './app/feature/pokemon/pokemon.module';
import { UserModule } from './app/feature/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PokemonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
