import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { User } from '../user/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) { }

  @Query(() => Boolean)
  checkFollowing(@CurrentUser() user: User,
    @Args('followedId', { type: () => Int }) followedId: number) {
    return this.followService.checkFollowing(user.id, followedId)
  }

  @Query(() => [Follow])
  userFollowers(
    @Args('followedId', { type: () => Int }) followedId: number) {
    return this.followService.userFollowers(followedId)
  }

  @Query(() => [Follow])
  userFollowed(
    @Args('followerId', { type: () => Int }) followerId: number) {
    return this.followService.userFollowed(followerId);
  }

  @Mutation(() => Boolean)
  follow(@CurrentUser() user: User,
    @Args('followedId', { type: () => Int }) followedId: number) {
    return this.followService.follow(user.id, followedId);
  }

  @Mutation(() => Boolean)
  unfollow(@CurrentUser() user: User,
    @Args('followedId', { type: () => Int }) followedId: number) {
    return this.followService.unfollow(user.id, followedId);
  }
}
