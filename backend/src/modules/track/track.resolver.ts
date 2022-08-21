import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';


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

  // @Query(returns => [Track])
  // forstImpTracks(@Args('profileId', { type: () => Int }) profileId: number) {
  //   return this.trackService.findAll(profileId);
  // }
}
