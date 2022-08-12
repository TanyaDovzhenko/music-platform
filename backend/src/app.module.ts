import * as path from 'path'
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from 'src/modules/user/entities/user.entity';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';


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
        UserProfile
        // MusicStyle,
        // UserMusicPrefs,
        // Track,
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
    UserModule,
    AuthModule,
    UserProfileModule,
    // MusicStyleModule,
    // TrackModule,
    // PlaylistModule,
    // CommentModule,
    // PostModule,
    // MusicianProfileModule,
    // AlbumModule,
    // FollowingModule,
    // FileManagerModule
  ],
})
export class AppModule { }
