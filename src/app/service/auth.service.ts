import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  constructor(private http: HttpClient, private router: Router) {

    this.userSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/Login`, { username, password, grant_type: 'password' })
      .pipe(
        map((res) => {
          let user: IUser = {
            email: username,
            token: res.access_token,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next({});
    this.router.navigate(['/login']);
  }
}
