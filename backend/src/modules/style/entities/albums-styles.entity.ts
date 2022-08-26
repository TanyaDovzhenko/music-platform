import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Album } from "src/modules/album/entities/album.entity";
import { Style } from "./style.entity";


@Table({ tableName: 'albums_styles', createdAt: false, updatedAt: false })
export class AlbumStyles extends Model<AlbumStyles> {
    @ForeignKey(() => Style)
    @Column({ type: DataType.INTEGER })
    styleId: number;

    @ForeignKey(() => Album)
    @Column({ type: DataType.INTEGER })
    albumId: number;
}