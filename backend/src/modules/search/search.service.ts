import { UserProfile } from './../user-profile/entities/user-profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from 'src/types/user-roles.enum';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Track) private trackRepo: typeof Track,
    @InjectModel(Album) private albumRepo: typeof Album) { }

  async findAllUsersByRole(role: UserRoles) {
    return await this.userRepo.findAll(
      { where: { role }, include: { all: true } })
  }

  async findUsers(role: UserRoles, name: string) {
    if (role) return await this.userRepo.findAll({
      where: { role },
      include: [{
        model: UserProfile,
        attributes: ['id', 'name', 'avatar', 'status'],
        where: { name: { [Op.like]: `%${name}%` } }
      }]
    })
    else {
      return await this.userRepo.findAll({
        include: [{
          model: UserProfile,
          attributes: ['id', 'name', 'avatar', 'status'],
          where: { name: { [Op.like]: `%${name}%` } }
        }]
      })
    }
  }

  async findTracks(trackName: string) {
    return await this.trackRepo.findAll({
      where: { name: { [Op.like]: `%${trackName}%` } },
      include: { all: true }
    })
  }

  async findAlbums(albumName: string) {
    return await this.albumRepo.findAll({
      where: { name: { [Op.like]: `%${albumName}%` } },
      include: { all: true }
    })
  }

}