import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { Album } from "./album.entity";


@Table({ tableName: 'user_profile_albums', createdAt: false, updatedAt: false })
export class UserProfileAlbums extends Model<UserProfileAlbums> {
    @ForeignKey(() => Album)
    @Column({ type: DataType.INTEGER })
    albumId: number;

    @ForeignKey(() => UserProfile)
    @Column({ type: DataType.INTEGER })
    userProfileId: number;
}