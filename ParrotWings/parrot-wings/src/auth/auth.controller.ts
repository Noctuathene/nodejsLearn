import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoginUserDTO } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { ApiOkResponse, ApiBody} from '@nestjs/swagger';


@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDTO })
  @ApiOkResponse({ description: 'result Token' })
  @Post('login')
  async login(@Request() req) {
    return this.authService.getJwtToken(req.user.userID);
  }
}
