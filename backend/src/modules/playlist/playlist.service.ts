import { DefaultPlaylistsNames } from './../../types/default-playlists';
import { AddTrackInput } from './dto/add-track-input';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { Track } from 'src/modules/track/entities/track.entity';
import { DefaultMusicianPlaylistsObj, DefaultPlaylistImgSrc, DefaultPlaylistsObj } from '../../types/default-playlists';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { User } from '../user/entities/user.entity';
import { UserProfileService } from '../user-profile/user-profile.service';
import { TrackService } from '../track/track.service';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { UserRoles } from 'src/types/user-roles.enum';


@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist) private playlistRepo: typeof Playlist,
    @Inject(forwardRef(() => UserProfileService))
    private userProfileService: UserProfileService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) { }

  async findAll(): Promise<Playlist[]> {
    return await this.playlistRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.playlistRepo.findByPk(id, { include: { all: true } });
  }

  async findUserPlaylists(profileId: number) {
    const userProfile = await this.userProfileService.findOne(profileId)
    return userProfile.playlists
  }

  async findUserSingles(profileId: number) {
    return await this.playlistRepo.findOne({
      where: {
        authorId: profileId,
        isDefault: true,
        name: DefaultPlaylistsNames.SINGLES,
      },
      include: { all: true }
    })
  }

  async addUserSingle(userProfileId: number, trackId: number) {
    const singlesPlaylist = await this.playlistRepo.findOne({
      where: {
        authorId: userProfileId,
        isDefault: true,
        name: DefaultPlaylistsNames.SINGLES
      }
    })
    const track = await this.trackService.findOne(trackId)
    await singlesPlaylist.$add('track', track.id)
    return true
  }

  async findUserFirstImp(userProfileId: number) {
    return await this.playlistRepo.findOne({
      where: {
        authorId: userProfileId,
        isDefault: true,
        name: DefaultPlaylistsNames.FIRST_IMP
      },
      include: { all: true }
    });
  }

  async createPlaylist(createPlaylistInput: CreatePlaylistInput) {
    const { tracksIds, musicStylesIds, image, ...data } = createPlaylistInput;
    let playlistImage = image ?? DefaultPlaylistImgSrc.DEFAULT
    const playlist = await this.playlistRepo.create({ ...data, image: playlistImage })

    // await playlist.$set('musicStyles', [])
    // playlist.musicStyles = []
    // musicStylesIds?.forEach(async element => {  //НАХОДИТЬ ПО СЕРВИСУ А НЕ ПО МОДЕЛИ
    //   const musicStyle = await this.musicStyleRepo.findByPk(musicStylesIds[element])
    //   if (musicStyle) await playlist.$add('musicStyle', musicStyle.id)
    // })

    await playlist.$set('tracks', [])
    playlist.tracks = []
    tracksIds?.forEach(async element => {
      const track = await this.trackService.findOne(tracksIds[element])
      if (track) await playlist.$add('track', track.id)
    })
    return playlist
  }

  async createDefaultPlaylists(userProfile: UserProfile, userRole: UserRoles) {
    await userProfile.$set('playlists', [])
    DefaultPlaylistsObj.forEach(async element => {
      const playlist = await this.createPlaylist(
        { ...element, authorId: userProfile.id, isDefault: true });
      await userProfile.$add('playlist', playlist.id)
    });

    if (userRole == UserRoles.MUSICIAN) {
      DefaultMusicianPlaylistsObj.forEach(async element => {
        const playlist = await this.createPlaylist(
          { ...element, authorId: userProfile.id, isDefault: true });
        await userProfile.$add('playlist', playlist.id)
      });
    }
  }

  async addTrack(addTrackInput: AddTrackInput) {
    const track = await this.trackService.findOne(addTrackInput.trackId)
    const playlist = await this.playlistRepo.findByPk(addTrackInput.playlistId);
    if (!track || !playlist) return null
    await playlist.$add('track', track.id)
    return true
  }
}
