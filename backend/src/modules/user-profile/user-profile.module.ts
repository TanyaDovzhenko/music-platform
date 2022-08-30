import { forwardRef, Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';
import { FileManagerModule } from '../file-manager/file-manager.module';


@Module({
  providers: [UserProfileResolver, UserProfileService],
  imports: [SequelizeModule.forFeature([UserProfile]),
  forwardRef(() => FileManagerModule)],
  exports: [UserProfileService]
})
export class UserProfileModule { }
