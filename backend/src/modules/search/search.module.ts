import { UserProfile } from './../user-profile/entities/user-profile.entity';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchResolver } from './search.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Playlist } from '../playlist/entities/playlist.entity';

@Module({
  providers: [SearchResolver, SearchService],
  imports: [SequelizeModule.forFeature(
    [User, Album, Track, Playlist, UserProfile])],
})
export class SearchModule { }
