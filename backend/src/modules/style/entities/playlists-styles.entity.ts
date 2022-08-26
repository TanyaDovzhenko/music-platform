import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Album } from "src/modules/album/entities/album.entity";
import { Playlist } from "src/modules/playlist/entities/playlist.entity";
import { Style } from "./style.entity";


@Table({ tableName: 'playlist_styles', createdAt: false, updatedAt: false })
export class PlaylistStyles extends Model<PlaylistStyles> {
    @ForeignKey(() => Style)
    @Column({ type: DataType.INTEGER })
    styleId: number;

    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number;
}