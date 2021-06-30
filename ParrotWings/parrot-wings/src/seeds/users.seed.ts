import { User } from '.././entites/user.entity'
import { hashSync } from 'bcrypt';

const startTransactionUser : User = {
    amount : 100000,
    username : 'startTransactionPW',
    email : 'startTransactionUser@pw.com',
    id : 'e456c3e6-258c-49f9-bfc8-116081349adk',
    sendedTransactions : [],
    getedTransactions : [],
    password:  hashSync("pwSecret", 10)
}
export const UserSeed : User[] = [startTransactionUser]
