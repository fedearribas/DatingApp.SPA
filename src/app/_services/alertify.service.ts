import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable()
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertifyjs.confirm(message, function(e) {
      if (e) {
        okCallback();
      }
    });
  }

  success(message: string) {
    alertifyjs.success(message);
  }

  error(message: string) {
    alertifyjs.error(message);
  }

  message(message: string) {
    alertifyjs.message(message);
  }

}
