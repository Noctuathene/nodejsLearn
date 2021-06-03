import { BadRequestException, Body, Controller, Get, Injectable, Param, Post, Query } from '@nestjs/common'
import { User } from 'src/entites/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { QueryParams } from './../common/query-params'

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService) { }

    @Post()
    async create(@Body() userDto: CreateUserDto) {
        var user = new User();
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
    async get(@Query() query : QueryParams) {
        throw new BadRequestException
        const newQuery = new QueryParams(query.skip, query.take, query.searchString);
        return await this.userService.findAll(newQuery.searchString, newQuery.take, newQuery.skip);
    }
}

