import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumEntity } from "./album.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => AlbumEntity, (album) => album.user)
  albums: AlbumEntity[] 
}