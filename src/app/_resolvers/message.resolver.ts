import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageSize = 5;
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(private userService: UserService, private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService) {  }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.currentUser.id, this.pageNumber,
          this.pageSize, this.messageContainer)
          .catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
    });
  }

}
