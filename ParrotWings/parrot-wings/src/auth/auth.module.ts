import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    useFactory : async () => ({
      secret : "hi_secret", //убрать в конфиг 
      signOptions : { expiresIn : 7 * 24 * 60 * 60}
    })
  })],
  controllers: [AuthController]
})
export class AuthModule {}