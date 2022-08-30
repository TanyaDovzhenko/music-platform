import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Track } from "./track.entity";


@Table({ tableName: 'user_profile_tracks', createdAt: false, updatedAt: false })
export class UserProfileTracks extends Model<UserProfileTracks> {
    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number;

    @ForeignKey(() => UserProfile)
    @Column({ type: DataType.INTEGER })
    userProfileId: number;
}