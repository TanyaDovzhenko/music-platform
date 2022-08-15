import { AlbumModule } from './modules/album/album.module';
import * as path from 'path'
import { ApolloDriver } from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from 'src/modules/user/entities/user.entity';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
import { Track } from './modules/track/entities/track.entity';
import { TrackModule } from './modules/track/track.module';
import { Playlist } from './modules/playlist/entities/playlist.entity';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { UserProfilePlaylists } from './modules/playlist/entities/user-profile-playlists.entity';
import { PlaylistsTracks } from './modules/playlist/entities/playlists-tracks.entity';
import { Album } from './modules/album/entities/album.entity';
import { UserProfileAlbums } from './modules/album/entities/user-profile-albums.entity';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema/gql'),
      sortSchema: true,
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      }
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '111',
      database: 'music-platform',
      models: [
        User,
        UserProfile,
        Track,
        Playlist,
        UserProfilePlaylists,
        PlaylistsTracks,
        Album,
        UserProfileAlbums
        // MusicStyle,
        // UserMusicPrefs,
        // TrackMusicStyles,
        // PlaylistsTracks,
        // Playlist,
        // PlaylistsMusicStyles,
        // TrackComment,
        // PlaylistComment,
        // ReviewComment,
        // Post,
        // PostComment,
        // Album,
        // MusicianProfile,
        // AlbumMusicStyles,
        // UserPlaylists
      ],
      autoLoadModels: true,
    }),
    SeederModule.forRoot({ runOnlyIfTableIsEmpty: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
    }),
    forwardRef(() => UserProfileModule),
    forwardRef(() => UserModule),
    forwardRef(() => PlaylistModule),
    forwardRef(() => AlbumModule),
    AuthModule,
    TrackModule,
  ],
})
export class AppModule { }
