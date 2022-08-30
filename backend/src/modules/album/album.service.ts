import { UserProfileService } from './../user-profile/user-profile.service';
import { FileManagerService } from './../file-manager/file-manager.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { FileTypes, ResourceTypes } from 'src/types/file-manager.types';
import { TrackService } from '../track/track.service';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './entities/album.entity';
import { StyleService } from '../style/style.service';
import { convertIdsToNumber } from 'src/utilities/convert-ids-to-number';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album) private albumRepo: typeof Album,
    private fileManagerService: FileManagerService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => UserProfileService))
    private userProfileService: UserProfileService) { }

  async create(createAlbumInput: CreateAlbumInput, fileImg: any) {
    const userProfile = await this.userProfileService.findOne(createAlbumInput.authorUserProfileId)

    const { image } = fileImg
    const imagePath = this.fileManagerService.createFile(
      FileTypes.IMAGE, ResourceTypes.ALBUM_IMG, image[0])

    const album = await this.albumRepo.create({
      ...createAlbumInput,
      image: imagePath,
      authorName: userProfile.name,
      authorUserId: userProfile.userId
    })
    return album
  }

  async findOne(albumId: number) {
    return await this.albumRepo.findByPk(albumId, { include: { all: true } })
  }

  async findAllUserAlbums(profileId: number) {
    return await this.albumRepo.findAll({
      where: { authorUserProfileId: profileId },
      include: { all: true },
      order: [['updatedAt', 'DESC']]
    })
  }

  async addTrack(trackId: number, albumId: number) {
    const track = await this.trackService.findOne(trackId)
    const album = await this.findOne(albumId)
    await album.$add('track', track.id)
    return true
  }

  async likeAlbum(profileId: number, albumId: number) {
    const profile = await this.userProfileService.findOne(profileId)
    const album = await this.findOne(albumId)
    await profile.$add('likedAlbum', album.id)
    return true
  }

  async unlikeAlbum(profileId: number, albumId: number) {
    const profile = await this.userProfileService.findOne(profileId)
    const album = await this.findOne(albumId)
    await profile.$remove('likedAlbum', album.id)
    return true
  }

  async findUserLikedAlbums(profileId: number) {
    const profile = await this.userProfileService.findOne(profileId)
    return profile.likedAlbums
  }

  async checkLikedAlbum(profileId: number, albumId: number) {
    const profile = await this.userProfileService.findOne(profileId)
    let isLiked = false
    profile.likedAlbums.forEach(item => {
      if (item.id == albumId) isLiked = true
    })
    return isLiked
  }
}
