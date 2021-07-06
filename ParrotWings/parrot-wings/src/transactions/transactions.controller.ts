import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './dto/transaction.dto';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { QueryParams } from '../common/query-params';
import { ApiBody } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @ApiBody({ type: TransactionDto })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Req() request, @Body() transactionDto: TransactionDto) {
    transactionDto.correspondent = new UserDto();
    transactionDto.correspondent.id = request.user.id;
    await this.transactionsService.create(transactionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Req() req, @Query() queryParams: QueryParams) {
    return await this.transactionsService.get(queryParams, req.user);
  }
}
