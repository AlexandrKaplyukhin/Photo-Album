import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "../DTO/create-album.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../auth/user.decorator";
import { UserEntity } from "../Entity/user.entity";

@Controller('albums')
@UseGuards(AuthGuard())
export class AlbumController {
  constructor(private albumService: AlbumService) {
  }

  @Get()
  getAllAlbums(
    @User() user: UserEntity
  ) {

    return this.albumService.getAllAlbums(user);
  }

  @Post()
  createNewAlbum(@Body() data: CreateAlbumDto,
                @User() user: UserEntity
  ) {

    return this.albumService.createAlbum(data, user);
  }


  @Delete(":id")
  deleteAlbum(@Param("id") id: number,
             @User() user: UserEntity) {
    return this.albumService.delete(id, user);
  }

}
