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
  iban: any = '';
  balance: any;
  userAccount: Account | undefined;
  userFriendList: any = new Array<User>();
  allUser: User[] = [];
  envoyerArgent: any;
  transfert: any;
  isValidFormSubmitted = false;
  envoyer: any;
  solde: any;
  friendsMail: any;
  ibanForm: any = new FormGroup({
    iban: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  errorMessage = '';
  chargerFailed = false;
  addIbanFailed = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.id = JSON.parse(localStorage.getItem('id')!);
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.userFriendList = data.friendsList;
        this.userAccount = data.account;
        this.iban = data.account?.iban;
      },
      error: (err) => {},
    });
    this.getAllUser();
  }

  async getAllUser() {
    await this.userService.getAllUser().subscribe({
      next: (data) => {
        this.allUser = data;
      },
      error: (error) => {},
    });
  }
  addIban() {
    this.chargerFailed = false;
    this.userService
      .addAcount(this.id, this.ibanForm.get('iban').value, 0)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          window.location.reload();
        },
        error: (error) => {
          this.addIbanFailed = true;
          this.errorMessage = error.error;
          console.error('There was an error!', error);
        },
      });
  }

  charger(chargerForm: NgForm) {
    this.addIbanFailed = false;

    this.isValidFormSubmitted = false;
    if (chargerForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.balance = chargerForm.controls['balance'].value;
    this.envoyer = chargerForm.controls['envoyer'].value;
    this.userService
      .updateAccount(this.id, this.balance, this.envoyer)
      .subscribe({
        next: (data) => {
          window.location.reload();
        },
        error: (error) => {
          this.chargerFailed = true;
          this.errorMessage = error.error;
          console.error('There was an error!', error);
        },
      });
  }
}
