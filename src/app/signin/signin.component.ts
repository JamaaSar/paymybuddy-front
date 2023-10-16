import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { User } from 'src/model/user';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})

export class SigninComponent implements OnInit{

  email: string = "";
  password:  string = "";
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: User | undefined;

  constructor(
    private authService: AuthenticationService,
    ) { }
  ngOnInit() {
  }

	onLogin() {
    this.authService.login(this.email, this.password);
  }
  reloadPage(): void {
    window.location.reload();
  }

}
