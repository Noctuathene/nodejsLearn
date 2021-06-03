import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserDTO } from "src/users/dto/user.dto";
import { TransactionsService } from "./transactions.service";
import { TransactionDto } from "./dto/transaction.dto"

@Controller('transactions')
export class TransactionsController {
    constructor(
        private transactionsService: TransactionsService) { }

    @Post()
    async create(@Body() transactionDto : TransactionDto){
        await this.transactionsService.create(transactionDto)
    }
}