import { PlaylistService } from './../playlist/playlist.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from 'src/types/user-roles.enum';
import { UserProfile } from './entities/user-profile.entity';


@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile) private userProfileRepo: typeof UserProfile,
    @Inject(forwardRef(() => PlaylistService))
    private playlistService: PlaylistService) { }

  async createUserProfile(userId: number, email: string, userRole: UserRoles) {
    const profile = await this.userProfileRepo.findOne({ where: { userId } })
    if (profile) return
    const name = email.split('@')[0]
    const avatar = `image/random-profile-avatar/${Math.floor(Math.random() * 21)}.jpg`
    const newProfile = await this.userProfileRepo.create({ userId, name, avatar })
    await this.playlistService.createDefaultPlaylists(newProfile, userRole)
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
    return await this.userProfileRepo.findAll({
      include: { all: true }
    })
  }
}
