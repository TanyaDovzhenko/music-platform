import { UserProfileModule } from 'src/modules/user-profile/user-profile.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { StyleModule } from '../style/style.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => UserProfileModule),
    StyleModule
  ],
  exports: [UserService]
})
export class UserModule { }
