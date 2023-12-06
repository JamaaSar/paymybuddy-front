import { Component, Input } from '@angular/core';
import { Transaction } from 'src/model/transaction';
import { User } from 'src/model/user';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent {
  @Input()
  sended!: Transaction[];
  @Input()
  recieved!: Transaction[];
}
