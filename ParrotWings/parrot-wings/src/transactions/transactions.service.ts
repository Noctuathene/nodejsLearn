import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getManager } from 'typeorm'
import { Transaction } from '../entites/transaction.entity'
import { TransactionDto } from './dto/transaction.dto'
import { User } from '../entites/user.entity'

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }
    
    
    async create(transactionDto : TransactionDto)
    {
        if (transactionDto.correspondent === transactionDto.recipient)
            throw new BadRequestException();
            var recipient = await this.userRepository.findOne(transactionDto.recipient.id);
            if (recipient === undefined)
                throw new BadRequestException("Recipient don't exist")
            var correspondent = await this.userRepository.findOne(transactionDto.correspondent.id);
            if (correspondent.amount < transactionDto.amount)
                throw new BadRequestException("Correspondent don't have enough PW")
        getManager().transaction(async transactionalEntityManager => {
            let transaction =  await this.transactionRepository.create(transactionDto);
            await transactionalEntityManager.save(transaction);
            await transactionalEntityManager.decrement(User, { id: transaction.correspondent.id}, 'amount', transaction.amount);
            await transactionalEntityManager.increment(User, { id: transaction.recipient.id}, 'amount', transaction.amount);
        });
        
    }
}