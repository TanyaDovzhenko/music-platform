import { UserProfileModule } from './../user-profile/user-profile.module';
import { UserProfile } from './../user-profile/entities/user-profile.entity';
import { TrackModule } from 'src/modules/track/track.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { Playlist } from './entities/playlist.entity';
import { UserProfilePlaylists } from './entities/user-profile-playlists.entity';
import { PlaylistsTracks } from './entities/playlists-tracks.entity';
import { StyleModule } from '../style/style.module';


@Module({
  providers: [PlaylistResolver, PlaylistService],
  imports: [
    SequelizeModule.forFeature([
      PlaylistsTracks,
      Playlist,
      UserProfilePlaylists
    ]),
    forwardRef(() => UserProfileModule),
    forwardRef(() => TrackModule),
    StyleModule,
  ],
  exports: [PlaylistService]
})
export class PlaylistModule { }
