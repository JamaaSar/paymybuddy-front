import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthenticationService } from '../service/authentication.service';
import { TokenService } from '../token.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})

export class SigninComponent {

 form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService, private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data);
        this.tokenService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
