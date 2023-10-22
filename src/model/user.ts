import { Account } from "./account";

export class User{
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password?: string;
    account?: Account;
    friends?: User[] ;
    token?: string;



}
