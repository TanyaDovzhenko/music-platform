import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';


@Injectable()
export class UserProfileService {
  constructor(@InjectModel(UserProfile) private userProfileRepo: typeof UserProfile) { }

  async createUserProfile(userId: number, email: string) {
    const profile = await this.userProfileRepo.findOne({ where: { userId } })
    if (profile) return
    const profileName = email.split('@')[0]
    return this.userProfileRepo.create({ userId, name: profileName })
  }

  findAll() {
    return `This action returns all userProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProfile`;
  }

  // update(id: number, updateUserProfileInput: UpdateUserProfileInput) {
  //   return `This action updates a #${id} userProfile`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userProfile`;
  }
}
