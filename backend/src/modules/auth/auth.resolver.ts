import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { AuthResponse } from './dto/auth-response';
import { Public } from './decorators/public.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Mutation(() => AuthResponse)
  @UseGuards(GqlAuthGuard)
  signin(@Args('signInInput') signInInput: SignInInput, @Context() context) {
    return this.authService.signin(context.user)
  }

  @Public()
  @Mutation(() => AuthResponse)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    console.log(createUserInput)
    //return this.authService.signup(createUserInput)
  }

}
