import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser!: User;
  id: number;

  constructor(private router: Router,private authService: AuthenticationService) {
      this.id = JSON.parse(localStorage.getItem('id')!);
      if (this.authService.isLoggedIn) {
            this.authService.getUser(this.id).subscribe({
            next: data => {
              this.currentUser = data;
            },error: err => {}})
        this.router.navigate(['/homepage']);
      } 
    }
}
