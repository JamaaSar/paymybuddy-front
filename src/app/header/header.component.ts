import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from 'src/model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentUser!: User;
  id: number;
  constructor(private authService: AuthenticationService) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.authService.getUser(this.id).subscribe({
        next: (data) => {
          this.currentUser = data;
        },
        error: (err) => {},
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
