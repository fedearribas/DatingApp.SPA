import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(data => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to log in');
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }

  loggedIn() {
    return localStorage.getItem('token') != null;
  }

}
