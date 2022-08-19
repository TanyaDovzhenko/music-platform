import { UserProfileService } from './../user-profile/user-profile.service';
import { FileManagerService } from './../file-manager/file-manager.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { FileTypes, ResourceTypes } from 'src/types/file-manager.types';
import { TrackService } from '../track/track.service';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './entities/album.entity';

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
    userProfile.userId
    const { image } = fileImg
    const imagePath = this.fileManagerService.createFile(
      FileTypes.IMAGE, ResourceTypes.ALBUM_IMG, image[0])
    return await this.albumRepo.create({
      ...createAlbumInput,
      image: imagePath,
      authorName: userProfile.name,
      authorUserId: userProfile.userId
    })
  }

  async findOne(albumId: number) {
    return await this.albumRepo.findByPk(albumId, { include: { all: true } })
  }

  async findAllUserAlbums(profileId: number) {
    return await this.albumRepo.findAll({
      where: { authorUserProfileId: profileId },
      include: { all: true }
    })
  }

  async addTrack(trackId: number, albumId: number) {
    const track = await this.trackService.findOne(trackId)
    const album = await this.findOne(albumId)
    await album.$add('track', track.id)
    return true
    //const album = await this.albumRepo.create(createAlbumInput)
  }

}
