import { IsDecimal, IsNumber, IsObject, ValidateNested } from "class-validator";
import { UserDTO } from "src/users/dto/user.dto";

export class TransactionDto{
    @ValidateNested()
    correspondent : UserDTO;
    @ValidateNested()
    recipient : UserDTO;
    
    @IsNumber()
    amount : number;

}