import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Transaction } from "../entites/transaction.entity"
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller"
import { User } from "../entites/user.entity"

@Module({
    imports : [TypeOrmModule.forFeature([Transaction, User])],
    providers: [TransactionsService],
    exports : [TransactionsService],
    controllers : [TransactionsController]
})
export class TransactionsModule {}