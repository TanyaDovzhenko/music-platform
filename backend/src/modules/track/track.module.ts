import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { FileManagerModule } from 'src/modules/file-manager/file-manager.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  providers: [TrackResolver, TrackService],
  imports: [
    SequelizeModule.forFeature([
      Track
    ]),
    FileManagerModule,
    UserProfileModule
  ],
  controllers: [TrackController]
})
export class TrackModule { }
