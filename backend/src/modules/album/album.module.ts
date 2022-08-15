import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { Track } from 'src/modules/track/entities/track.entity';
import { Album } from './entities/album.entity';
import { UserProfileAlbums } from './entities/user-profile-albums.entity';

@Module({
  providers: [AlbumResolver, AlbumService],
  imports: [SequelizeModule.forFeature([Album, UserProfileAlbums])]
})
export class AlbumModule { }
