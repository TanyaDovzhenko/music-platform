import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow) private followRepo: typeof Follow) { }

  async checkFollowing(followerId: number, followedId: number) {
    const follow = await this.followRepo.findOne(
      { where: { followerId, followedId } })
    if (follow) return true
    else return false
  }

  async userFollowers(followedId: number) {
    return await this.followRepo.findAll({ where: { followedId } })
  }

  async userFollowed(followerId: number) {
    return await this.followRepo.findAll({ where: { followerId } })
  }

  async follow(followerId: number, followedId: number) {
    await this.followRepo.create({ followerId, followedId })
    return true
  }

  async unfollow(followerId: number, followedId: number) {
    await this.followRepo.destroy({ where: { followerId, followedId } })
    return true
  }
}
