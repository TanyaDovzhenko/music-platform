import { UserProfileService } from './../user-profile/user-profile.service';
import { FileManagerService } from './../file-manager/file-manager.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
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
    private userProfileService: UserProfileService,
    private styleService: StyleService) { }

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

    let stylesIds = createAlbumInput.stylesIds
    if (typeof stylesIds == 'string') stylesIds = convertIdsToNumber(stylesIds)
    stylesIds?.forEach(async element => {
      const musicStyle = await this.styleService.findOne(element)
      if (musicStyle) await album.$add('style', musicStyle.id)
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
}
