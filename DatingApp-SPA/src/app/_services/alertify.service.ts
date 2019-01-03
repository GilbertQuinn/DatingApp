import { Injectable } from '@angular/core';
declare let alertify: any; // to avoid ts link errors - not sure who this makes sense

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }


// alertify message wrapper - Confirm
confirm(message: string, okCallback: () => any) {
  alertify.confirm(message, function(e) {
    if (e) {
      okCallback();
    } else {}
  });
}

// alertify message wrapper - Success Alert
error(message: string) {
  alertify.error(message);
}

// alertify message wrapper - Success Alert
success(message: string) {
  alertify.success(message);
}

// alertify message wrapper - Warning
warning(message: string) {
  alertify.warning(message);
}

// alertify message wrapper - Message
message(message: string) {
  alertify.message(message);
}

}
