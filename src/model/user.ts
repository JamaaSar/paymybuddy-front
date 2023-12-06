import { Account } from './account';

export class User {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  password?: string;
  account?: Account;
  friendsList?: User[];
  token?: string;
}
