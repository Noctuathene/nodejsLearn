import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
