import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlbumEntity } from "../Entity/album.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    AuthModule
  ],
  controllers: [AlbumController],
  providers: [AlbumService]
})
export class AlbumModule {
}
