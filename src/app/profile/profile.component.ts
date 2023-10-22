import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../service/user.service';
import { Account } from 'src/model/account';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  implements OnInit{
  currentUser!: User;
  id!: number;
  accountForm: any;
  iban: string = ""
  balance!: number;
  userAccount!: Account;
  userFriendList: any = new  Array<User>;
  allUser: User[] = [];

  constructor( private userService: UserService) {
            
              
  }
  

  ngOnInit() {
      this.id = JSON.parse(localStorage.getItem('id')!);
     this.userService.getUser(this.id).subscribe((res:any)=>{
       this.currentUser = res;
       this.iban = res.account.iban
       this.userFriendList = res.friends
     });
    this.getAllUser()
    
  }
  
async getAllUser() {
    await this.userService.getAllUser().subscribe({
    next: data => {
      this.allUser = data;
    },
    error: err => {}
    });
  }
  onSubmit() {
    this.userService.addAcount(this.id, this.iban, 0).subscribe((res:any)=>{
      this.currentUser = res;
      });
  }

  charger() {
    this.userService.chargerAccount(this.id, this.balance).subscribe({
    next: data => {
    },
    error: err => {}
    });
  }

}
