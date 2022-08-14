import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entities/user-profile.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';


@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Query(() => [UserProfile])
  async userProfiles() {
    return await this.userProfileService.findAll();
  }

  @Query(() => UserProfile)
  userProfile(@Args('id', { type: () => Int }) id: number) {
    return this.userProfileService.findOne(id);
  }

  @Query(() => UserProfile)
  currentUserProfile(@CurrentUser() user: User) {
    return this.userProfileService.findOne(user.id);
  }

  // @Mutation(() => UserProfile)
  // updateUserProfile(@Args('updateUserProfileInput') updateUserProfileInput: UpdateUserProfileInput) {
  //   return this.userProfileService.update(updateUserProfileInput.id, updateUserProfileInput);
  // }
}
