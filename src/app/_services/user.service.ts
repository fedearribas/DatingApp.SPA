import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Message } from '../_models/message';
import { HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';

@Injectable()
export class UserService {

  baseUrl = environment.apiUrl + 'users';

  constructor(private authHttp: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('itemsPerPage', itemsPerPage);
    }

    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }


    return this.authHttp
      .get<User[]>(this.baseUrl, {observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getUser(id): Observable<User> {
    return this.authHttp.get<User>(this.baseUrl + '/' + id);
  }

  updateUser(user: User) {
    return this.authHttp.put(this.baseUrl + '/' + user.id, user);
  }

  setMainPhoto(userId: number, photoId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/photos/' + photoId + '/setMain', {});
  }

  deletePhoto(userId: number, photoId: number) {
    return this.authHttp.delete(this.baseUrl + '/' + userId + '/photos/' + photoId);
  }

  sendLike(userId: number, recipientId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?: string) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('itemsPerPage', itemsPerPage);
    }
    return this.authHttp.get<Message[]>(this.baseUrl + '/' + id + '/messages', {observe: 'response', params })
    .pipe(
      map((response) => {
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.authHttp.get<Message[]>(this.baseUrl + '/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.authHttp.post<Message>(this.baseUrl + '/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/messages/' + id, {}).pipe(map(res => {}));
  }

  markAsRead(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + '/' + userId + '/messages/' + id + '/read', {}).pipe(map(res => {})).subscribe();
  }
}
