import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './entities/playlist.entity';
import { DefaultPlaylistsObj } from '../../types/default-playlists';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { UserProfileService } from '../user-profile/user-profile.service';
import { TrackService } from '../track/track.service';
import { UserProfile } from '../user-profile/entities/user-profile.entity';


@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist) private playlistRepo: typeof Playlist,
    @Inject(forwardRef(() => UserProfileService))
    private userProfileService: UserProfileService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService
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

  async createPlaylist(createPlaylistInput: CreatePlaylistInput) {
    const { tracksIds, ...data } = createPlaylistInput;
    const playlist = await this.playlistRepo.create({ ...data })

    // await playlist.$set('tracks', [])
    // playlist.tracks = []
    tracksIds?.forEach(async element => {
      const track = await this.trackService.findOne(tracksIds[element])
      if (track) await playlist.$add('track', track.id)
    })

    return playlist
  }

  async createDefaultPlaylists(userProfile: UserProfile) {
    await userProfile.$set('playlists', [])
    DefaultPlaylistsObj.forEach(async element => {
      const playlist = await this.createPlaylist(
        { ...element, authorId: userProfile.id, isDefault: true });
      await userProfile.$add('playlist', playlist.id)
    });
  }

  async addTrack(playlistId: number, trackId: number) {
    const track = await this.trackService.findOne(trackId)
    const playlist = await this.playlistRepo.findByPk(playlistId);
    if (!track || !playlist) return null
    await playlist.$add('track', track.id)
    return true
  }
}
