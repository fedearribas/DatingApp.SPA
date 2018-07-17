import { UserService } from './../../_services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { tap } from 'rxjs/operators';
import { Message } from '../../_models/message';
import * as _ from 'underscore';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authService: AuthService, private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = this.authService.currentUser.id;
    this.userService.getMessageThread(currentUserId, this.userId)
    .pipe(
      tap(messages => {
        _.each(messages, (message: Message) => {
          if (!message.isRead && message.recipientId === currentUserId) {
            this.userService.markAsRead(currentUserId, message.id);
          }
        });
      })
    ).subscribe(data => {
      this.messages = data;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.userId;
    this.userService.sendMessage(this.authService.currentUser.id, this.newMessage).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
