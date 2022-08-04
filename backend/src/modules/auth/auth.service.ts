import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';



@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email)
    if (!user) return null

    const passwordValid = bcrypt.compareSync(password, user.password)
    if (!passwordValid) return null

    return user
  }

  // async signup(createUserInput: CreateUserInput) {
  //   const password = bcrypt.hashSync(createUserInput.password, 3)
  //   const user = await this.userService.createUser({ ...createUserInput, password })
  //   return {
  //     access_token: this.jwtService.signAsync(
  //       { email: user.email, sub: user.id }
  //     ),
  //     user
  //   }
  // }

  async signin(user: User) {
    return {
      access_token: this.jwtService.signAsync(
        { email: user.email, sub: user.id }
      ),
      user
    }
  }

}
