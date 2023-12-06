import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  isLoginFailed = false;
  errorMessage = '';
  signinForm: any = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  isClicked = false;

  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {}

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
  ngOnInit() {}

  onLogin() {
    if (!this.signinForm) {
      this.isLoginFailed = true;
      return;
    }
    this.authService
      .login(
        this.signinForm.get('email').value,
        this.signinForm.get('password').value
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('id', res.id);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.isLoginFailed = true;
          this.errorMessage = error.error;
          console.error('There was an error!', error);
        },
      });
  }
}
