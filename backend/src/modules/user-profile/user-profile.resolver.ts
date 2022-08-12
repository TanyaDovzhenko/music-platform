import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entities/user-profile.entity';


@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly userProfileService: UserProfileService) { }

  @Query(() => [UserProfile])
  async userProfiles() {
    return await this.userProfileService.findAll();
  }

  @Query(() => UserProfile, { name: 'userProfile' })
  async userProfile(@Args('id', { type: () => Int }) id: number) {
    return await this.userProfileService.findOne(id);
  }

  // @Mutation(() => UserProfile)
  // updateUserProfile(@Args('updateUserProfileInput') updateUserProfileInput: UpdateUserProfileInput) {
  //   return this.userProfileService.update(updateUserProfileInput.id, updateUserProfileInput);
  // }
}
