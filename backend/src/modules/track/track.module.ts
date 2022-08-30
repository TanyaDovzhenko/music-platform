import { UserProfileTracks } from 'src/modules/track/entities/user-profile-tracks';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { FileManagerModule } from 'src/modules/file-manager/file-manager.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { AlbumModule } from '../album/album.module';

@Module({
  providers: [TrackResolver, TrackService],
  imports: [
    SequelizeModule.forFeature([
      Track,
      UserProfileTracks
    ]),
    forwardRef(() => UserProfileModule),
    forwardRef(() => AlbumModule),
    FileManagerModule,
  ],
  controllers: [TrackController],
  exports: [TrackService]
})
export class TrackModule { }
