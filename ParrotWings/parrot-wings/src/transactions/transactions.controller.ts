import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "./dto/transaction.dto"
import  JwtAuthGuard  from '../auth/jwt-auth.guard' 

@Controller('transactions')
export class TransactionsController {
    constructor(
        private transactionsService: TransactionsService) { }

    
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() transactionDto : TransactionDto){
        await this.transactionsService.create(transactionDto)
    }
}