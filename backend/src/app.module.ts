import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './album/album.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 2340,
  username: 'root',
  password: 'root',
  database: 'album_db',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), AuthModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
