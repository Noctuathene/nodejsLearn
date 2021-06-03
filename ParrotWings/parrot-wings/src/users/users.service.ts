import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { User } from './../entites/user.entity'
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>) { }

    findAll(keyword: string, take: number, skip: number): Promise<[User[], number]> {
        return this.usersRepository.findAndCount({
            where: { username: Like('%' + keyword + '%') },
            order: { username: "DESC" },
            take: take,
            skip: skip
        });
    }

    async create(user : User)
    {
        await this.usersRepository.save(user);
    }

    async findOne(id : string): Promise<User> {
        return this.usersRepository.findOne(id, {
            select : ['id', 'username']
        })
    }
        
}