import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { QueryParams } from './../common/query-params';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() userDto: CreateUserDto) {
    const user = new User();
    user.username = userDto.username;
    user.password = userDto.password;
    user.email = userDto.email;
    return await this.userService.create(user);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  @ApiQuery({ type : QueryParams})
  @UsePipes(new ValidationPipe({ transform: true }))
  async get(@Query() query: QueryParams) {
    return await this.userService.findAll(
      query.searchString,
      query.take,
      query.skip,
    );
  }
}
