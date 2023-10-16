import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    firstName:string = ""
    lastName:string = ""
    email:string = ""
    password:string = ""
    repassword:string = ""
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

  constructor(private authService: AuthenticationService) { }

  onRegister(): void {

    if (this.password === this.repassword) {
      this.authService.register(this.firstName, this.lastName, this.email, this.password);
  } }
		
}
