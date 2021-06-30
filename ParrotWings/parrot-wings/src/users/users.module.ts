import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { Transaction } from '../entites/transaction.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
