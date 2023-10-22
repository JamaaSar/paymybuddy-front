import { Component, Input, TemplateRef } from '@angular/core';
import { User } from 'src/model/user';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent {
  displayedColumns = 6;
  toggle: Boolean = false;
  id: number;
  @Input()
  friendList: User[] = [];
  @Input()
  allUser: User[] = [];
  searchResult: User[] = [];
  text!: string;
  constructor(private userService: UserService) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  ngOnInit() {}

  onChange(e: string) {
    this.text = e;
    if (!e) {
      this.searchResult = this.friendList;
    }
    this.searchResult = this.allUser.filter(user => user?.email.toLowerCase().includes(e));
    this.toggle = false;
  }

  showDetails(series:User) {
    this.toggle = true;
    console.log(series)
    this.userService.addFriend(this.id, series.email).subscribe({
      next: data => {
      },
      error: err => {
      }
    });
}}
