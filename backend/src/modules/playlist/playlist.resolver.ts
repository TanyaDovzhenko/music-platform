import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistInput } from './dto/create-playlist.input';
import { User } from 'src/modules/user/entities/user.entity';
import { AddTrackInput } from './dto/add-track-input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) { }

  // @Query(() => [Playlist])
  // playlists() {
  //   return this.playlistService.findAll();
  // }

  @Query(() => [Playlist])
  userPlaylists(@CurrentUser() user: User) {
    return this.playlistService.findUserPlaylists(user.id);
  }

  @Query(() => Playlist)
  playlist(@Args('id', { type: () => Int }) id: number) {
    return this.playlistService.findOne(id);
  }

  @Mutation(() => Playlist)
  createPlaylist(
    @CurrentUser() user: User,
    @Args('createPlaylistInput') createPlaylistInput: CreatePlaylistInput) {
    return this.playlistService.createPlaylist({ ...createPlaylistInput, authorId: user.id });
  }

  @Query(() => Playlist)
  singlesTracks(@CurrentUser() user: User) {
    return this.playlistService.findUserSingles(user.id);
  }

  @Query(() => Playlist)
  firstImpTracks(@CurrentUser() user: User) {
    return this.playlistService.findUserFirstImp(user.id);
  }

  @Mutation(() => Boolean)
  addTrack(@Args('addTrackInput') addTrackInput: AddTrackInput) {
    return this.playlistService.addTrack(addTrackInput);
  }
}
