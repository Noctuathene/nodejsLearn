import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Transaction } from '../entity/transaction.entity'
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Transaction)
    private transactionRepository : Repository<Transaction>
  ) {}

  findAll(
    keyword: string,
    take: number,
    skip: number,
  ): Promise<[User[], number]> {
    return this.usersRepository.findAndCount({
      where: { username: Like('%' + keyword + '%') },
      order: { username: 'DESC' },
      take: take,
      skip: skip,
    });
  }

  async create(user: User) {
    try {
      const userToCreate = await this.usersRepository.create(user);
      userToCreate.password = await hash(user.password, 10);
      userToCreate.amount = 0;
      const createdUser = await this.usersRepository.save(userToCreate);
      const transaction = new Transaction();
      transaction.amount = 500;
      transaction.recipient = createdUser;
      transaction.correspondent = new User();
      transaction.correspondent.id = "e456c3e6-258c-49f9-bfc8-116081349adk"
      transaction.date = new Date();
      this.transactionRepository.save(transaction)
      return createdUser.id;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY')
        throw new BadRequestException('Email in using');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email: email });
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id, {
      select: ['id', 'username'],
    });
  }
}
