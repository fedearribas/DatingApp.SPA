import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers, Response } from '@angular/Http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { AuthHttp } from 'angular2-jwt';
import { Message } from '../_models/message';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl + 'users';

  constructor(private authHttp: AuthHttp) { }

  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (userParams != null) {
      queryString +=
        'minAge=' + userParams.minAge +
        '&maxAge=' + userParams.maxAge +
        '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
    }

    if (likesParam === 'Likers') {
      queryString += 'Likers=true&';
    }

    if (likesParam === 'Likees') {
      queryString += 'Likees=true&';
    }

    return this.authHttp.get(this.baseUrl + queryString)
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
    return this.authHttp.get(this.baseUrl + '/' + id)
      .map(res => <User>res.json())
      .catch(this.handleError);
  }

  updateUser(user: User) {
    return this.authHttp.put(this.baseUrl + '/' + user.id, user).catch(this.handleError);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/photos/' + photoId + '/setMain', {}).catch(this.handleError);
  }

  deletePhoto(userId: number, photoId: number) {
    return this.authHttp.delete(this.baseUrl + '/' + userId + '/photos/' + photoId).catch(this.handleError);
  }

  sendLike(userId: number, recipientId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/like/' + recipientId, {}).catch(this.handleError);
  }

  getMessages(id: number, page?: number, itemsPerPage?: number, messageContainer?: string) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let queryString = '?MessageContainer=' + messageContainer + '&';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page +
        '&pageSize=' + itemsPerPage + '&';
    }
    return this.authHttp.get(this.baseUrl + '/' + id + '/messages' + queryString)
      .map((response: Response) => {
        paginatedResult.result = response.json();

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }).catch(this.handleError);
  }

  getMessageThread(id: number, recipientId: number) {
    return this.authHttp.get(this.baseUrl + '/' + id + '/messages/thread/' + recipientId).map(res => {
      return res.json();
    }).catch(this.handleError);
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp.post(this.baseUrl + '/' + id + '/messages', message).map(res => {
      return res.json();
    }).catch(this.handleError);
  }

  deleteMessage(id: number, userId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/messages/' + id, {}).map(res => {}).catch(this.handleError);
  }

  markAsRead(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/messages/' + id + '/read', {}).map(res => {}).subscribe();
  }

  private handleError(error: any) {
    if (error.status === 400) {
      return Observable.throw(error._body);
    }
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
