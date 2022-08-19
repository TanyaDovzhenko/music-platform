import { UserProfileModule } from 'src/modules/user-profile/user-profile.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { Album } from './entities/album.entity';
import { UserProfileAlbums } from './entities/user-profile-albums.entity';
import { TrackModule } from '../track/track.module';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumResolver, AlbumService],
  imports: [
    SequelizeModule.forFeature(
      [Album, UserProfileAlbums]),
    TrackModule,
    FileManagerModule,
    UserProfileModule
  ],
  controllers: [AlbumController]
})
export class AlbumModule { }
