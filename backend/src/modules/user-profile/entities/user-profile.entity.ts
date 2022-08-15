import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/modules/album/entities/album.entity';
import { UserProfileAlbums } from 'src/modules/album/entities/user-profile-albums.entity';
import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import { UserProfilePlaylists } from 'src/modules/playlist/entities/user-profile-playlists.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
@Table({ tableName: 'user_profiles', createdAt: false, updatedAt: false })
export class UserProfile extends Model<UserProfile>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING })
  @Field()
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  status: string;

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @HasMany(() => Track)
  @Field(type => [Track], { nullable: true })
  track: Track[];

  @HasMany(() => Album)
  @Field(type => [Album], { nullable: true })
  album: Album[];

  @BelongsToMany(() => Playlist, () => UserProfilePlaylists)
  @Field(type => [Playlist], { nullable: true })
  playlists: Playlist[];

  @BelongsToMany(() => Album, () => UserProfileAlbums)
  @Field(type => [Album], { nullable: true })
  albums: Album[];

  // @HasOne(() => ProfileSettings
  // @Field(type => ProfileSettings)
  // profileSettings: ProfileSettings;

  // @HasMany(() => Post)
  // @Field(type => [Post], { nullable: true })
  // posts: Post[];

  // @HasMany(() => TrackComment)
  // @Field(type => [TrackComment], { nullable: true })
  // tracksComments: TrackComment[];

  // @HasMany(() => PlaylistComment)
  // @Field(type => [PlaylistComment], { nullable: true })
  // playlistsComments: PlaylistComment[];

  // @HasMany(() => ReviewComment)
  // @Field(type => [ReviewComment], { nullable: true })
  // reviewsComments: ReviewComment[];

  // @BelongsToMany(() => MusicStyle, () => UserMusicPrefs)
  // @Field(type => [MusicStyle], { nullable: true })
  // musicStylePrefs: MusicStyle[];


}
