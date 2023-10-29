import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../service/user.service';
import { Account } from 'src/model/account';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser!: User;
  id!: number;
  accountForm: any;
  iban: string = '';
  balance: any;
  userAccount!: Account;
  userFriendList: any = new Array<User>();
  allUser: User[] = [];
  envoyerArgent: any;
  transfererArgent: any;
  isValidFormSubmitted = false;
  envoyer: any;
  solde: any;
  friendsMail: any;
  ibanForm: any = new FormGroup({
    iban: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.userService.getUser(this.id).subscribe((res: any) => {
      this.currentUser = res;
      this.userAccount = res.account;
      console.log(this.userAccount);
      this.iban = res.account?.iban;
      this.solde = res.account?.balance;
      this.userFriendList = res.friends ? res.friends : null;
    });
    this.getAllUser();
  }

  async getAllUser() {
    await this.userService.getAllUser().subscribe({
      next: (data) => {
        this.allUser = data;
      },
      error: (err) => {},
    });
  }
  addIban() {
    this.userService
      .addAcount(this.id, this.ibanForm.get('iban').value, 0)
      .subscribe((res: any) => {
        this.currentUser = res;
        window.location.reload();
      });
  }

  charger(chargerForm: NgForm) {
    this.isValidFormSubmitted = false;
    if (chargerForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.balance = chargerForm.controls['balance'].value;
    this.envoyer = chargerForm.controls['envoyer'].value;
    console.log(this.envoyer);
    this.userService
      .updateAccount(this.id, this.balance, this.envoyer)
      .subscribe({
        next: (data) => {
          window.location.reload();
        },
        error: (err) => {},
      });
  }
}
