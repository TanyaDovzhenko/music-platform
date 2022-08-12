import { UserService } from './user.service';
import { Resolver, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  user(@CurrentUser() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }
}
