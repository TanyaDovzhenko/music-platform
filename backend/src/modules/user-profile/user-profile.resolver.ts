import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entities/user-profile.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';


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
  userProfileByUserId(@Args('userId', { type: () => Int }) userId: number) {
    return this.userProfileService.findOneByUserId(userId);
  }

  @Query(() => UserProfile)
  currentUserProfile(@CurrentUserProfile() profileId: number) {
    return this.userProfileService.findOne(profileId);
  }

  // @Mutation(() => UserProfile)
  // updateUserProfile(@Args('updateUserProfileInput') updateUserProfileInput: UpdateUserProfileInput) {
  //   return this.userProfileService.update(updateUserProfileInput.id, updateUserProfileInput);
  // }
}
