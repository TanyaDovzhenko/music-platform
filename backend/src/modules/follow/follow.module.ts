import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';

@Module({
  providers: [FollowResolver, FollowService],
  imports: [SequelizeModule.forFeature([Follow])],
  exports: [FollowService]

})
export class FollowModule { }

