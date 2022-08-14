import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';


@Injectable()
export class UserProfileService {
  constructor(@InjectModel(UserProfile) private userProfileRepo: typeof UserProfile) { }

  async createUserProfile(userId: number, email: string) {
    const profile = await this.userProfileRepo.findOne({ where: { userId } })
    if (profile) return

    const name = email.split('@')[0]
    const avatar = `image/random-profile-avatar/${Math.floor(Math.random() * 23)}.jpg`

    return await this.userProfileRepo.create({ userId, name, avatar })
  }

  async findOne(userId: number) {
    return await this.userProfileRepo.findOne({ where: { userId }, include: { all: true } })
  }

  async findAll() {
    return await this.userProfileRepo.findAll({ include: { all: true } })
  }

  // update(id: number, updateUserProfileInput: UpdateUserProfileInput) {
  //   return `This action updates a #${id} userProfile`;
  // }
}
