import { Account } from "./account";

export interface User{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    repassword: string;
    account: Account;



}