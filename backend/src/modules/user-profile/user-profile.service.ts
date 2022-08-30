import { InjectModel } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';
import { FileManagerService } from '../file-manager/file-manager.service';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { forwardRef, Inject, Injectable } from '@nestjs/common';


@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile) private userProfileRepo: typeof UserProfile,
    @Inject(forwardRef(() => FileManagerService))
    private fileManagerService: FileManagerService) { }

  async createUserProfile(userId: number, email: string) {
    const profile = await this.userProfileRepo.findOne({ where: { userId } })
    if (profile) return
    const name = email.split('@')[0]
    const avatar = await this.fileManagerService.createRandomAvatar()
    const newProfile = await this.userProfileRepo.create({ userId, name, avatar })
    return newProfile
  }

  async findOne(profileId: number) {
    return await this.userProfileRepo.findByPk(profileId,
      { include: { all: true } })
  }

  async findOneByUserId(userId: number) {
    return await this.userProfileRepo.findOne({
      where: { userId }, include: { all: true }
    })
  }

  async findAll() {
    return await this.userProfileRepo.findAll({ include: { all: true } })
  }

  async update(updateProfileInput: UpdateUserProfileInput) {
    const profile = await this.findOne(updateProfileInput.id)
    await profile.update(updateProfileInput)
    await profile.save()
    return profile
  }
}
