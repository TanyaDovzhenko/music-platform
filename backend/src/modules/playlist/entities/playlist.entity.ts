import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { PlaylistStyles } from 'src/modules/style/entities/playlists-styles.entity';
import { Style } from 'src/modules/style/entities/style.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PlaylistsTracks } from './playlists-tracks.entity';
import { UserProfilePlaylists } from './user-profile-playlists.entity';

@ObjectType()
@Table({ tableName: 'playlists', createdAt: false, updatedAt: false })
export class Playlist extends Model<Playlist> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  image: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  @Field()
  likes: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  @Field()
  isDefault: boolean;

  @BelongsToMany(() => Style, () => PlaylistStyles)
  @Field(type => [Style], { nullable: true })
  styles: Style[];

  @BelongsToMany(() => Track, () => PlaylistsTracks)
  @Field(type => [Track], { nullable: true })
  tracks: Track[];

  @BelongsToMany(() => UserProfile, () => UserProfilePlaylists)
  @Field(type => [UserProfile], { nullable: true })
  userProfiles: UserProfile[];

  @BelongsTo(() => UserProfile)
  userProfile: UserProfile

  @ForeignKey(() => UserProfile)
  @Column({ type: DataType.INTEGER })
  @Field(type => Int)
  authorId: number;
}
