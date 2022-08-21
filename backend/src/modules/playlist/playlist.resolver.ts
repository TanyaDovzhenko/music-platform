import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { User } from 'src/modules/user/entities/user.entity';
import { AddTrackInput } from './dto/add-track-input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) { }

  // @Query(() => [Playlist])
  // playlists() {
  //   return this.playlistService.findAll();
  // }

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
  addTrack(@Args('addTrackInput') addTrackInput: AddTrackInput) {
    return this.playlistService.addTrack(addTrackInput);
  }
}
