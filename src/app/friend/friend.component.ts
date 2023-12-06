import { Component, Input, TemplateRef } from '@angular/core';
import { User } from 'src/model/user';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
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
  errorMessage = '';

  constructor(private userService: UserService, public router: Router) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  ngOnInit() {}

  onChange(e: string) {
    this.text = e;
    if (!e) {
      this.searchResult = [];
    } else {
      this.searchResult = this.allUser.filter((user) =>
        user?.email.toLowerCase().includes(e)
      );
    }
    this.toggle = false;
  }

  showDetails(series: User) {
    this.toggle = true;
    this.userService.addFriend(this.id, series.email).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (error) => {
        this.errorMessage = error.error;
        console.error('There was an error!', error);
      },
    });
  }
}
