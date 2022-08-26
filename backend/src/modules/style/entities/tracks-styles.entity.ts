import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Track } from "src/modules/track/entities/track.entity";
import { Style } from "./style.entity";


@Table({ tableName: 'tracks_styles', createdAt: false, updatedAt: false })
export class TracksStyles extends Model<TracksStyles> {
    @ForeignKey(() => Style)
    @Column({ type: DataType.INTEGER })
    styleId: number;

    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number;
}