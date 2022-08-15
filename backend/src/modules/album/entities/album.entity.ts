import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Track } from 'src/modules/track/entities/track.entity';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
import { UserProfileAlbums } from './user-profile-albums.entity';



@ObjectType()
@Table({ tableName: 'albums' })
export class Album extends Model<Album>{

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @Field(type => Int)
  id: number;

  @Column({ type: DataType.STRING })
  @Field()
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  image?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  @Field()
  rate: number

  @HasMany(() => Track)
  @Field(type => [Track], { nullable: true })
  tracks: Track[];

  @BelongsToMany(() => UserProfile, () => UserProfileAlbums)
  @Field(type => [UserProfile], { nullable: true })
  userProfiles: UserProfile[];

  @BelongsTo(() => UserProfile)
  authorUserProfile: UserProfile;

  @ForeignKey(() => UserProfile)
  @Column({ type: DataType.INTEGER })
  @Field(type => Int)
  authorUserProfileId: number;
}
