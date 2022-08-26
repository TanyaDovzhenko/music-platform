import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserProfile } from "src/modules/user-profile/entities/user-profile.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Style } from "./style.entity";


@Table({ tableName: 'user_styles', createdAt: false, updatedAt: false })
export class UserStyles extends Model<UserStyles> {
    @ForeignKey(() => Style)
    @Column({ type: DataType.INTEGER })
    styleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;
}