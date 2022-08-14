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

  @Query(returns => [Track])
  userSingles(@Args('userProfileId', { type: () => Int }) userProfileId: number) {
    return this.trackService.findUserSingles(userProfileId);
  }

  @Query(returns => Track)
  track(@Args('id', { type: () => Int }) id: number) {
    return this.trackService.findOne(id);
  }
}
