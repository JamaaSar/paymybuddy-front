import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Transaction } from 'src/model/transaction';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isLoggedIn = false;
  allUser: User[] = [];
  userFriendList: any = new Array<User>();
  currentUser!: User;
  id: number;
  isValidFormSubmitted = false;
  sendForm: any = new FormGroup({
    friendsMail: new FormControl('', [Validators.required]),
    message: new FormControl(''),
    balance: new FormControl('', [Validators.required]),
  });
  failed = false;
  notFound = false;
  errorMessage = '';
  searchResult: User[] = [];
  sended: Transaction[] = [];
  recieved: Transaction[] = [];

  toggle: Boolean = false;

  constructor(private userService: UserService) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }
  get friendsMail() {
    return this.sendForm.get('friendsMail');
  }
  get message() {
    return this.sendForm.get('message');
  }
  get balance() {
    return this.sendForm.get('balance');
  }
  set friendsMail(value: FormControl) {
    this.friendsMail = value;
  }

  get text() {
    return this.sendForm.get('text');
  }

  ngOnInit() {
    this.getUser();
    this.getAllUser();
    this.getPaymrnt();
    this.getReceivedTransaction();
  }

  async getUser() {
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.userFriendList = data.friendsList;
      },
      error: (err) => {},
    });
  }
  async getPaymrnt() {
    this.userService.getSentTransaction(this.id).subscribe({
      next: (data) => {
        this.sended = data;
      },
      error: (err) => {},
    });
  }
  async getReceivedTransaction() {
    this.userService.getReceivedTransaction(this.id).subscribe({
      next: (data) => {
        this.recieved = data;
      },
      error: (err) => {},
    });
  }

  async getAllUser() {
    await this.userService.getAllUser().subscribe({
      next: (data) => {
        this.allUser = data;
      },
      error: (err) => {},
    });
  }

  send() {
    this.isValidFormSubmitted = false;
    if (this.sendForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.userService
      .send(
        this.id,
        this.sendForm.get('balance').value,
        this.sendForm.get('friendsMail').value,
        this.sendForm.get('message').value
      )
      .subscribe({
        next: (data) => {
          window.location.reload();
        },
        error: (error) => {
          this.failed = true;
          this.errorMessage = error.error;
        },
      });
  }
  onChange(e: string) {
    if (!e) {
      this.searchResult = [];
    } else {
      this.searchResult = this.userFriendList.filter(
        (user: { email: string }) => user?.email.toLowerCase().includes(e)
      );

      if (this.searchResult.length <= 0) {
        this.searchResult = [];
        this.notFound = true;
        this.errorMessage = 'ajouter ami';
      }
    }
    this.toggle = false;
  }
  showDetails(series: User) {
    this.toggle = true;
    this.sendForm.controls['friendsMail'].setValue(series.email);
    this.searchResult = [];
  }
}
