import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';


@Resolver(() => Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) { }

  @Query(returns => [Track])
  tracks() {
    return this.trackService.findAll();
  }

  @Query(returns => Track)
  track(@Args('id', { type: () => Int }) id: number) {
    return this.trackService.findOne(id);
  }

  @Query(returns => [Track])
  singles(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.trackService.findUserSingles(profileId);
  }

  @Query(returns => [Track])
  currentUserLikedTracks(@CurrentUserProfile() profileId: number) {
    return this.trackService.findUserLikedTracks(profileId);
  }

  @Query(returns => [Track])
  likedTracks(@Args('profileId', { type: () => Int }) profileId: number) {
    return this.trackService.findUserLikedTracks(profileId);
  }

  @Query(returns => Boolean)
  checkLikedTrack(
    @CurrentUserProfile() profileId: number,
    @Args('trackId') trackId: number) {
    return this.trackService.checkLikedTrack(profileId, trackId);
  }

  @Mutation(() => Boolean)
  likeTrack(@CurrentUserProfile() profileId: number,
    @Args('trackId') trackId: number) {
    return this.trackService.likeTrack(profileId, trackId);
  }

  @Mutation(() => Boolean)
  unlikeTrack(@CurrentUserProfile() profileId: number,
    @Args('trackId') trackId: number) {
    return this.trackService.unlikeTrack(profileId, trackId);
  }
}
