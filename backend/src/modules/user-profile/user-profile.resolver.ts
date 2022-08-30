import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entities/user-profile.entity';
import { CurrentUserProfile } from '../auth/decorators/current-user-profile.decorator';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';


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

  @Mutation(() => UserProfile)
  updateUserProfile(
    @CurrentUserProfile() profileId: number,
    @Args('updateUserProfileInput') updateUserProfileInput: UpdateUserProfileInput) {
    return this.userProfileService.update({
      ...updateUserProfileInput, id: profileId
    });
  }
}
