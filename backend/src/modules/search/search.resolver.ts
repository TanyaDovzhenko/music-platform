import { UserProfile } from './../user-profile/entities/user-profile.entity';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { User } from '../user/entities/user.entity';
import { UserRoles } from 'src/types/user-roles.enum';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';

@Resolver(() => '')
export class SearchResolver {
  constructor(private readonly searchService: SearchService) { }

  @Query(() => [User])
  usersByRole(
    @Args('userRole', { type: () => UserRoles }) userRole: UserRoles) {
    return this.searchService.findAllUsersByRole(userRole);
  }

  @Query(() => [User])
  usersByParams(
    @Args('userRole', { type: () => UserRoles, nullable: true }) userRole: UserRoles,
    @Args('userName', { type: () => String }) userName: string) {
    return this.searchService.findUsers(userRole, userName);
  }

  @Query(() => [Track])
  tracksByParams(@Args('trackName', { type: () => String }) trackName: string) {
    return this.searchService.findTracks(trackName);
  }

  @Query(() => [Album])
  albumsByParams(@Args('albumName', { type: () => String }) albumName: string) {
    return this.searchService.findAlbums(albumName);
  }
}
