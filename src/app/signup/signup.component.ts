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
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
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

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }
  onRegister(): void {
    console.log('object');
    this.authService
      .register(
        this.signupForm.get('firstName').value,
        this.signupForm.get('lastName').value,
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
          this.errorMessage = error.error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
