import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl + 'users/';

  constructor(private http: AuthHttp) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl)
      .map(res => <User[]>res.json())
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.http.get(this.baseUrl + id)
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + user.id, user).catch(this.handleError);
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError)  {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateErrors || 'Server error');
  }

}
