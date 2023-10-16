import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  isLoggedIn = false;
  allUser: User[] = [];
  userFriendList: any = new  Array<User>;
  currentUser!: User;
  id: number;

  constructor( private userService: UserService) {
              this.id = JSON.parse(localStorage.getItem('id')!);

  }
  
  ngOnInit() {
    this.getUser()
    this.getAllUser()
  }

  async getUser() {
    this.userService.getUser(this.id).subscribe({
    next: data => {
      this.currentUser = data;
      this.userFriendList = data.friends;
    },
    error: err => {}
    });
  }

  async getAllUser() {
    await this.userService.getAllUser().subscribe({
    next: data => {
      this.allUser = data;
    },
    error: err => {}
    });
  }
}
