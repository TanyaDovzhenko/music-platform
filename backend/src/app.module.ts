import * as path from 'path';
import { AlbumModule } from './modules/album/album.module';
import { ApolloDriver } from '@nestjs/apollo';
import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from 'src/modules/user/entities/user.entity';
import { StyleModule } from './modules/style/style.module';
import { Style } from './modules/style/entities/style.entity';
import { Track } from './modules/track/entities/track.entity';
import { TrackModule } from './modules/track/track.module';
import { FollowModule } from './modules/follow/follow.module';
import { Follow } from './modules/follow/entities/follow.entity';
import { SearchModule } from './modules/search/search.module';
import { Album } from './modules/album/entities/album.entity';
import { UserStyles } from './modules/style/entities/user-styles.entity';
import { UserProfileAlbums } from './modules/album/entities/user-profile-albums.entity';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserProfile } from 'src/modules/user-profile/entities/user-profile.entity';
import { UserProfileTracks } from './modules/track/entities/user-profile-tracks';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema/gql'),
      sortSchema: true,
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      cors: { origin: 'http://localhost:3000', credentials: true },
      uploads: false,
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
        Album,
        UserProfileAlbums,
        Style,
        UserStyles,
        Follow,
        UserProfileTracks
      ],
      autoLoadModels: true,
    }),
    SeederModule.forRoot({ runOnlyIfTableIsEmpty: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
    }),
    forwardRef(() => UserProfileModule),
    forwardRef(() => UserModule),
    forwardRef(() => AlbumModule),
    AuthModule,
    TrackModule,
    StyleModule,
    FollowModule,
    SearchModule,
  ],
})
export class AppModule { }
