import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';


@Resolver(() => Album)
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) { }

  @Query(() => Album)
  album(@Args('id', { type: () => Int }) id: number) {
    return this.albumService.findOne(id);
  }

  @Query(() => [Album])
  currentUserAlbums(@CurrentUserProfile() profileId: number) {
    return this.albumService.findAllUserAlbums(profileId);
  }

  @Query(() => [Album])
  userAlbums(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.albumService.findAllUserAlbums(profileId);
  }

  @Mutation(() => Boolean)
  addAlbumTrack(@Args('trackId', { type: () => Int }) trackId: number,
    @Args('albumId', { type: () => Int }) albumId: number) {
    return this.albumService.addTrack(trackId, albumId)
  }

  @Query(returns => [Album])
  currentUserLikedAlbums(@CurrentUserProfile() profileId: number) {
    return this.albumService.findUserLikedAlbums(profileId);
  }

  @Query(returns => [Album])
  likedAlbums(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.albumService.findUserLikedAlbums(profileId);
  }

  @Query(returns => Boolean)
  checkLikedAlbum(
    @CurrentUserProfile() profileId: number,
    @Args('albumId') albumId: number) {
    return this.albumService.checkLikedAlbum(profileId, albumId);
  }

  @Mutation(() => Boolean)
  likeAlbum(@CurrentUserProfile() profileId: number,
    @Args('albumId') albumId: number) {
    return this.albumService.likeAlbum(profileId, albumId);
  }

  @Mutation(() => Boolean)
  unlikeAlbum(@CurrentUserProfile() profileId: number,
    @Args('albumId') albumId: number) {
    return this.albumService.unlikeAlbum(profileId, albumId);
  }
}