import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/model/user';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private id: number;
  user: User = new User();

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) {
    this.id = JSON.parse(localStorage.getItem('id')!);
  }
  public get userId() {
    return this.id;
  }

  get isLoggedIn() {
    let authToken = localStorage.getItem('auth_token');
    return authToken !== null ? true : false;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`, {
      headers: this.headers,
    });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  login(email: string, password: string): Observable<any> {
    console.log('object');
    return this.http.post<User>(
      `${environment.apiUrl}/login`,
      { email, password },
      { headers: this.headers }
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/register`,
      { firstName, lastName, email, password },
      httpOptions
    );
  }

  logout() {
    let removeToken = window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('id');
    if (removeToken == null) {
      this.router.navigate(['/signin']).then(() => {
        window.location.reload();
      });
    }
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
