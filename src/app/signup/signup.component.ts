import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    repassword:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthenticationService) { }
  onSubmit(): void {
  const { firstname, lastname, email, password, repassword } = this.form;
  if(firstname === lastname){  this.authService.register(firstname, lastname, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.message;
        this.isSignUpFailed = true;
      }
    });
  } }
}
