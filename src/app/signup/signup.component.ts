import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  signupForm: any = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {}
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }

  get lastname() {
    return this.signupForm.get('lastname');
  }
  onRegister(): void {
    this.authService
      .register(
        this.signupForm.get('firstname').value,
        this.signupForm.get('lastname').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.isSignUpFailed = true;
          this.errorMessage = error.error;
          console.error('There was an error!', error);
        },
      });
  }
}
