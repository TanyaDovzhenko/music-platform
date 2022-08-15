import { PlaylistModule } from './../playlist/playlist.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { FileManagerModule } from 'src/modules/file-manager/file-manager.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { PlaylistsTracks } from '../playlist/entities/playlists-tracks.entity';

@Module({
  providers: [TrackResolver, TrackService],
  imports: [
    SequelizeModule.forFeature([
      Track,
      PlaylistsTracks
    ]),
    forwardRef(() => UserProfileModule),
    forwardRef(() => PlaylistModule),
    FileManagerModule
  ],
  controllers: [TrackController],
  exports: [TrackService]
})
export class TrackModule { }
