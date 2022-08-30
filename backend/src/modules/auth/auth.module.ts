import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy],
  imports: [UserModule, PassportModule, JwtModule.register({
    signOptions: { expiresIn: '168h' },
    secret: '111'
  })]
})
export class AuthModule { }
