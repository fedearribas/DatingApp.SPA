import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageSize = 5;
  pageNumber = 1;

  constructor(private userService: UserService, private router: Router,
    private alertify: AlertifyService) {  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }

}
