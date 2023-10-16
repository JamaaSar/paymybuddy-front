import { Account } from "./account";

export class User{
    [x: string]: any;
    id!: number;
    firstName!: string;
    lastLame!: string;
    email!: string;
    password?: string;
    account?: Account;
    friends?: User[] ;
    token?: string;



}
