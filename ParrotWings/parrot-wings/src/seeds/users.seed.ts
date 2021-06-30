import { User } from '../entity/user.entity'
import { hashSync } from 'bcrypt';

let startTransactionUser = new User;
startTransactionUser.amount = 100000;
startTransactionUser.username = 'startTransactionPW';
startTransactionUser.email = 'startTransactionUser@pw.com';
startTransactionUser.id = 'e456c3e6-258c-49f9-bfc8-116081349adk';
startTransactionUser.password = hashSync("pwSecret", 10);

export const UserSeed: User[] = [startTransactionUser]
