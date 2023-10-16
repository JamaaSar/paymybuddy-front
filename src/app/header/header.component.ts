import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from 'src/model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


@Input()
currentUser: User = new User;
  constructor(private authService: AuthenticationService) {}
  
  ngOnInit() {
  }
  
  logout():void {
    this.authService.logout();

  }


}
