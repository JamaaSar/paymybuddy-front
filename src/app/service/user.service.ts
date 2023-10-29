import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from 'src/model/user';
import { Observable } from 'rxjs';


const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
  
export class UserService {

  currentUser!: User;
  id: number;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }

  getUser(id: number):Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`,
      {headers : this.headers});
  }

  getAllUser() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/allUser/${this.id}`,
      {headers: this.headers});
  }
  
  addFriend(id: number, email: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/${id}/addFriend/${email}`,
      {id,email});
  }
  
  addAcount(id: number, iban: string, balance:number):Observable<any>  {
    return this.http.post(`${environment.apiUrl}/user/${id}/createAccount`,
      {iban, balance}, { headers: this.headers });
  }
  
  updateAccount(id: number, balance: number, envoyer:string): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/user/${id}/${envoyer}/${balance}`,{ headers: this.headers });
  }

  send(id: number, balance: number, friendMail:string): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/user/${id}/envoyer/${friendMail}`,
      {  balance }, { headers: this.headers });
  }

}
