import { Type } from 'class-transformer';
import {
  Allow,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { UserDto } from '../../users/dto/user.dto'
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  correspondent: UserDto;
  
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  recipient: UserDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
