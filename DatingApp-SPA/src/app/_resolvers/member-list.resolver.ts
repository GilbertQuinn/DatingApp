import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {

        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data from server');
                this.router.navigate(['/home']);
                return of(null); // null observable from rxjs
            })
        );

        /*
        Debuggin...
       this.userService.getUsers().subscribe((users: User[]) => {
           console.log(users);
       });
       return of(null);
       */
    }
}
