import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Playlist } from "./playlist.entity";
import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";


@Table({ tableName: 'user_profile_playlists', createdAt: false, updatedAt: false })
export class UserProfilePlaylists extends Model<UserProfilePlaylists> {
    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number;

    @ForeignKey(() => UserProfile)
    @Column({ type: DataType.INTEGER })
    userProfileId: number;
}