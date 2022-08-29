import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) { }

  @Query(() => [Playlist])
  userPlaylists(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.playlistService.findUserPlaylists(profileId);
  }

  @Query(() => [Playlist])
  currentUserPlaylists(@CurrentUserProfile() profileId: number) {
    return this.playlistService.findUserPlaylists(profileId);
  }

  @Query(() => Playlist)
  playlist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.findOne(id);
  }

  @Mutation(() => Playlist)
  createPlaylist(
    @CurrentUserProfile() profileId: number,
    @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
    return this.playlistService.createPlaylist({
      ...createPlaylistInput, authorId: profileId
    });
  }

  @Mutation(() => Boolean)
  addTrack(
    @Args('playlistId') playlistId: number,
    @Args('trackId') trackId: number) {
    return this.playlistService.addTrack(playlistId, trackId);
  }
}
