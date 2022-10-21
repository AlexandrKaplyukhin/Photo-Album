import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  status: AlbumStatus;

  @ManyToOne(() => UserEntity, (user) => user.albums)
  user: UserEntity

  @Column()
  userId: number;
}