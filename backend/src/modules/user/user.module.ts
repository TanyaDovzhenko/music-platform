import { UserProfileModule } from 'src/modules/user-profile/user-profile.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    UserProfileModule
  ],
  exports: [UserService]
})
export class UserModule { }
