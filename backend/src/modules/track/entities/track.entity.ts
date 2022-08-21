import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Album } from 'src/modules/album/entities/album.entity';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
// import { Album } from 'src/modules/album/entities/album.entity';
// import { TrackComment } from 'src/modules/comment/entities/track-comment.entity';
// import { MusicStyle } from 'src/modules/music-style/entities/music-style.entity';
// import { TrackMusicStyles } from 'src/modules/music-style/entities/tracks-music-styles.entity';
// import { MusicianProfile } from 'src/modules/musician-profile/entities/musician-profile.entity';
// import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
// import { PlaylistsTracks } from 'src/modules/playlist/entities/playlists-tracks.entity';

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
  userProfile: UserProfile

  @ForeignKey(() => UserProfile)
  @Column({ type: DataType.INTEGER })
  @Field(type => Int)
  userProfileId?: number;

  @BelongsTo(() => Album)
  album: Album

  @ForeignKey(() => Album)
  @Column({ type: DataType.INTEGER, allowNull: true })
  @Field(type => Int, { nullable: true })
  albumId?: number;

  // @HasMany(() => TrackComment)
  // @Field(type => [TrackComment], { nullable: true })
  // comments?: TrackComment[];

  // @BelongsToMany(() => MusicStyle, () => TrackMusicStyles)
  // @Field(type => [MusicStyle], { nullable: true })
  // musicStyles?: MusicStyle[];

  // @BelongsToMany(() => Playlist, () => PlaylistsTracks)
  // @Field(type => [Playlist], { nullable: true })
  // playlists?: Playlist[];

  // @BelongsTo(() => MusicianProfile)
  // musicianProfile: MusicianProfile;

  // @ForeignKey(() => MusicianProfile)
  // @Column({ type: DataType.INTEGER })
  // @Field(type => Int)
  // musicianProfileId: number;
}


