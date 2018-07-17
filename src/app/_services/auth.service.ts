import { AuthUser } from './../_models/authUser';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '../../../node_modules/@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'login', model, {headers: new HttpHeaders()
      .set('Content-Type', 'Application/json')})
      .pipe(
        map(user => {
          if (user && user.tokenString) {
            localStorage.setItem('token', user.tokenString);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.currentUser = user.user;
            this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
            this.userToken = user.tokenString;
            if (this.currentUser.photoUrl != null) {
              this.changeMemberPhoto(this.currentUser.photoUrl);
            } else {
              this.changeMemberPhoto('../../assets/user.png');
            }
          }
        })
      );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user, {headers: new HttpHeaders()
      .set('Content-Type', 'Application/json')});
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }
}
