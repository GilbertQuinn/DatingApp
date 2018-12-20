import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

// Create our own class to intercept http errors
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {

                    // 401 error handling
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }

                    // Application error handling
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }

                    // Server error handling
                    const serverError = error.error;
                    let modelStateErrors = '';
                    if (serverError && typeof serverError === 'object') { // check for objects which means it is modelstate error
                        for (const key in serverError) {
                            if (serverError[key]) { // not sure if we are looping why we check to make sure it exists??
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }
                    }

                    // Finally, throw our errors
                    return throwError(modelStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

// Create a new provider for errors that use our new interceptor class
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
