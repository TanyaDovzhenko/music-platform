import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  BelongsTo, BelongsToMany, Column, DataType,
  ForeignKey, Model, Table
} from 'sequelize-typescript';
import { Album } from 'src/modules/album/entities/album.entity';
import { Style } from 'src/modules/style/entities/style.entity';
import { TracksStyles } from 'src/modules/style/entities/tracks-styles.entity';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';

@ObjectType()
@Table({ tableName: 'tracks' })
export class Track extends Model<Track>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  audio: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  @Field(type => Int)
  rate: number

  @BelongsTo(() => UserProfile)
  @Field(type => UserProfile)
  userProfile: UserProfile

  @ForeignKey(() => UserProfile)
  @Column({ type: DataType.INTEGER })
  @Field(type => Int)
  userProfileId?: number;

  @BelongsTo(() => Album)
  @Field(type => Album, { nullable: true })
  album: Album

  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int, { nullable: true })
  albumId?: number;

  @BelongsToMany(() => Style, () => TracksStyles)
  @Field(type => [Style], { nullable: true })
  styles: Style[];
}


