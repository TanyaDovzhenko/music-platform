import { PlaylistService } from './../playlist/playlist.service';
import { ResourceTypes } from './../../types/file-manager.types';
import { InjectModel } from '@nestjs/sequelize';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackInput } from './dto/create-track.input';
import { Track } from './entities/track.entity';
import { FileTypes } from 'src/types/file-manager.types';
import { FileManagerService } from '../file-manager/file-manager.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { AlbumService } from '../album/album.service';


@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track) private trackRepo: typeof Track,
    @Inject(forwardRef(() => PlaylistService))
    private playlistService: PlaylistService,
    private fileManagerService: FileManagerService) { }

  async findAll(): Promise<Track[]> {
    return await this.trackRepo.findAll({
      include: { all: true },
      order: [['updatedAt', 'DESC']]
    })
  }

  async findUserSingles(userProfileId: number): Promise<Track[]> {
    return await this.trackRepo.findAll({
      where: { userProfileId, albumId: null },
      include: { all: true },
      order: [['updatedAt', 'DESC']]
    })
  }

  async findOne(id: number): Promise<Track> {
    return await this.trackRepo.findByPk(id, { include: { all: true } })
  }

  async create(createTrackInput: CreateTrackInput, files: any): Promise<Track> {
    //const { musicStylesIds, ...data } = createTrackInput
    const { image, audio } = files
    const audioPath = this.fileManagerService.createFile(
      FileTypes.AUDIO, ResourceTypes.TRACK, audio[0])
    const imagePath = this.fileManagerService.createFile(
      FileTypes.IMAGE, ResourceTypes.TRACK_IMG, image[0])

    const track = await this.trackRepo.create({
      audio: audioPath,
      image: imagePath,
      ...createTrackInput
    })

    // await track.$set('musicStyles', [])
    // track.musicStyles = []
    // musicStylesIds?.forEach(async element => {
    //   const musicStyle = await this.musicStyleRepo.findByPk(musicStylesIds[element])
    //   if (musicStyle) await track.$add('musicStyle', musicStyle.id)
    // })
    return track
  }


}
