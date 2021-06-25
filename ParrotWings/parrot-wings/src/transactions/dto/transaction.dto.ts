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
import { UserDto } from 'src/users/dto/user.dto';

export class TransactionDto {
  correspondent: UserDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  recipient: UserDto;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
