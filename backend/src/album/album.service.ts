import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumEntity } from "../Entity/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "../DTO/create-album.dto";
import { UserEntity } from "../Entity/user.entity";

@Injectable()
export class AlbumService {

  constructor(@InjectRepository(AlbumEntity) private repo: Repository<AlbumEntity>) {
  }


  async getAllAlbums(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('album');

    query.where(`album.userId = :userId`, {userId: user.id});

    try {
      return await query.getMany();
    } catch (err) {
      throw new NotFoundException('No album found');
    }


  }

  async createAlbum(createAlbumDTO: CreateAlbumDto, user: UserEntity){
    const album = new AlbumEntity();
    const {title} = createAlbumDTO;
    album.title = title;
    album.userId = user.id;

    this.repo.create(album);
    try {
      return await this.repo.save(album);
    } catch (err) {
      console.log(err.stack);
      throw new InternalServerErrorException('Something went wrong, album not created');

    }

  }


  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({id, userId: user.id});

    if (result.affected === 0) {
      throw new NotFoundException('Album not deleted');
    } else {
      return { success: true}
    }

  }
}
