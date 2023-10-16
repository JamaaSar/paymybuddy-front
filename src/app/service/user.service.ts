import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from 'src/model/user';
import { Account } from 'src/model/account';
import {  Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';



const headers =  new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        })
@Injectable({
  providedIn: 'root'
})
  
  
export class UserService {

  currentUser!: User;
  id: number;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
                  this.id = JSON.parse(localStorage.getItem('id')!);

}

  getUser(id: number):Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`,
      {headers : headers});
  }
  getAllUser() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/allUser/${this.id}`, {headers:headers});
  }
  
  addFriend(id: number, email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/${id}/addFriend/${email}`, {
      id,
      email
  });
  }
  
  getById(id: number, account: Account) {
    return this.http.post(`${environment.apiUrl}/user/${id}/createAccount`,{id,account} );
    }

}
