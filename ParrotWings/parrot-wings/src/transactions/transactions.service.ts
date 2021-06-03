import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getManager, Like } from 'typeorm'
import { Transaction } from '../entites/transaction.entity'
import { TransactionDto } from './dto/transaction.dto'
import { User } from '../entites/user.entity'
import { QueryParams } from 'src/common/query-params'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }


    async givePwToNewUser(userId : string)
    {
        let transaction = new Transaction();
        transaction.amount = 500;
        transaction.recipient = new User();
        transaction.recipient.id = userId;
        transaction.date = new Date();
        this.transactionRepository.save(transaction);
    }



    async create(transactionDto: TransactionDto) {
        if (transactionDto.correspondent === transactionDto.recipient)
            throw new BadRequestException();
        var recipient = await this.userRepository.findOne(transactionDto.recipient.id);
        if (recipient === undefined)
            throw new BadRequestException("Recipient don't exist")
        var correspondent = await this.userRepository.findOne(transactionDto.correspondent.id);
        if (correspondent.amount < transactionDto.amount)
            throw new BadRequestException("Correspondent don't have enough PW")
        getManager().transaction(async transactionalEntityManager => {
            let transaction = await this.transactionRepository.create(transactionDto);
            await transactionalEntityManager.save(transaction);
            await transactionalEntityManager.decrement(User, { id: transaction.correspondent.id }, 'amount', transaction.amount);
            await transactionalEntityManager.increment(User, { id: transaction.recipient.id }, 'amount', transaction.amount);
        });

    }


    async get(queryParams: QueryParams, user: User) {
        let transactions = await this.transactionRepository.findAndCount({
            relations: ["correspondent", "recipient"],
            where: [
                { correspondent: Like(user.id) },
                { recipient: Like(user.id) }],
            order: {
                date: "DESC"
            }
        });

        let findedUser = await this.userRepository.findOne(user.id);
        let balance: number = Number(findedUser.amount);
        let username: string;
        let result = transactions[0].map(tr => {
            let amount: number = Number(tr.amount);
            if (tr.correspondent.id === findedUser.id) {
                balance -= amount;
                username = tr.recipient.username;
            }
            else {
                balance += amount;
                username = tr.correspondent.username;
            }
            return {
                balance: balance,
                username: username,
                amount: tr.amount,
                date: tr.date,
            }
        });
        return result;
    }
}