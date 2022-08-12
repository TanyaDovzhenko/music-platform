import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';

@Module({
  providers: [UserProfileResolver, UserProfileService],
  imports: [SequelizeModule.forFeature([UserProfile])],
  exports: [UserProfileService]
})
export class UserProfileModule { }
