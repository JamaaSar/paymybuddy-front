import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';

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

  constructor(private userService: UserService) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  ngOnInit() {
    this.getUser();
    console.log(this.currentUser);
    this.getAllUser();
  }

  async getUser() {
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        this.currentUser = data;
        console.log(data);
        this.userFriendList = data.friends;
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

  send(sendForm: NgForm) {
    this.isValidFormSubmitted = false;
    if (sendForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    // this.balance = sendForm.controls['balance'].value;
    // this.friendsMail = sendForm.controls['friendsMail'].value;
    // console.log(this.envoyer);
    // this.userService.send(this.id, this.balance, this.friendsMail).subscribe({
    //   next: (data) => {},
    //   error: (err) => {},
    // });
  }
}
