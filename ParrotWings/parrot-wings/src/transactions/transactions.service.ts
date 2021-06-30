import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Like } from 'typeorm';
import { Transaction } from '../entites/transaction.entity';
import { TransactionDto } from './dto/transaction.dto';
import { User } from '../entites/user.entity';
import { QueryParams } from '../common/query-params';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async givePwToNewUser(userId: string) {
    const transaction = new Transaction();
    transaction.amount = 500;
    transaction.recipient = new User();
    transaction.recipient.id = userId;
    transaction.date = new Date();
    this.transactionRepository.save(transaction);
  }

  async create(transactionDto: TransactionDto) {
    if (transactionDto.correspondent === transactionDto.recipient)
      throw new BadRequestException();
    const recipient = await this.userRepository.findOne(
      transactionDto.recipient.id,
    );
    if (recipient === undefined)
      throw new BadRequestException("Recipient don't exist");
    const correspondent = await this.userRepository.findOne(
      transactionDto.correspondent.id,
    );
    if (correspondent.amount < transactionDto.amount)
      throw new BadRequestException("Correspondent don't have enough PW");
    getManager().transaction(async (transactionalEntityManager) => {
      const transaction = await this.transactionRepository.create(
        transactionDto,
      );
      transaction.date = new Date();
      await transactionalEntityManager.save(transaction);
      await transactionalEntityManager.decrement(
        User,
        { id: transaction.correspondent.id },
        'amount',
        transaction.amount,
      );
      await transactionalEntityManager.increment(
        User,
        { id: transaction.recipient.id },
        'amount',
        transaction.amount,
      );
    });
  }

  async get(queryParams: QueryParams, user: User) {
    const transactions = await this.transactionRepository.findAndCount({
      relations: ['correspondent', 'recipient'],
      where: [{ correspondent: Like(user.id) }, { recipient: Like(user.id) }],
      order: {
        date: 'ASC',
      },
    });

    const findedUser = await this.userRepository.findOne(user.id);
    let balance = 0;
    let username: string;
    const result = transactions[0].map((tr) => {
      const amount = Number(tr.amount);
      let operation;
      if (tr.correspondent.id === findedUser.id) {
        operation = "-";
        balance -= amount;
        username = tr.recipient.username;
      } else {
        operation = "+"
        balance += amount;
        username = tr.correspondent.username;
      }
      return {
        operation : operation,
        balance: balance,
        username: username,
        amount: tr.amount,
        date: tr.date,
      };
    });
    return result;
  }
}
