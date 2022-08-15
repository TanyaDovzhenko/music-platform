import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Track } from "src/modules/track/entities/track.entity";
import { Playlist } from "./playlist.entity";


@Table({ tableName: 'playlists_tracks', createdAt: false, updatedAt: false })
export class PlaylistsTracks extends Model<PlaylistsTracks> {
    @ForeignKey(() => Playlist)
    @Column({ type: DataType.INTEGER })
    playlistId: number;

    @ForeignKey(() => Track)
    @Column({ type: DataType.INTEGER })
    trackId: number;
}