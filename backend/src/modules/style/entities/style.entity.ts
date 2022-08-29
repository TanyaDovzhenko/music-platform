import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/modules/album/entities/album.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { AlbumStyles } from './albums-styles.entity';
import { TracksStyles } from './tracks-styles.entity';
import { UserStyles } from './user-styles.entity';
import { User } from 'src/modules/user/entities/user.entity';


@ObjectType()
@Table({ tableName: 'styles', createdAt: false, updatedAt: false })
export class Style extends Model<Style>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  name: string;

  @BelongsToMany(() => Album, () => AlbumStyles)
  @Field(type => [Album], { nullable: true })
  albums: Album[];

  @BelongsToMany(() => User, () => UserStyles)
  @Field(type => [User], { nullable: true })
  users: User[];

  @BelongsToMany(() => Track, () => TracksStyles)
  @Field(type => [Track], { nullable: true })
  tracks: Track[];
}
