import { PaginatedResult } from './../_models/pagination';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl + 'users';

  constructor(private http: AuthHttp) { }

  getUsers(page?: number, itemsPerPage?: number) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }

    return this.http.get(this.baseUrl + queryString)
      .map(res => {
        paginatedResult.result = res.json();

        if (res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'));
        }

        return paginatedResult;
      })
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.http.get(this.baseUrl + '/' + id)
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user).catch(this.handleError);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.http.post(this.baseUrl + '/' + userId + '/photos/' + photoId + '/setMain', {}).catch(this.handleError);
  }

  deletePhoto(userId: number, photoId: number) {
    return this.http.delete(this.baseUrl + '/' + userId + '/photos/' + photoId).catch(this.handleError);
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
