import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { EMPTY, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



const excludeUrls = [
    '/api/utilisateurs/authenticate',
    '/api/products/getCategories',
];

const urlsWithRespenseText = [
    '/api/utilisateurs/authenticate'
];

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(
        //private progress:ProgressService ,
        private toaster: ToastrService,
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.isExcludeURL(request)) {
            return next.handle(request);
        }

        const token: string = this.getToken();

         if(token !=null || token!=''){
            request = this.setTokenToRequest(token, request);
         }



        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);

                    // this.toaster.success(
                    //     'success')
                }
                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                console.log('err')
                if (err.status === 401) {
                    this.router.navigate(['accesstofinance']);
                } else {
                    const message = err.error.message || 'Erreur serveur, Veuillez réessayer';
                    console.log(err)
                    this.toaster.error(
                        message,
                        "Error",
                        {
                          closeButton: true,
                          timeOut: 5000
                        })
                }
                return throwError(err);
            })
        );
    }

    private setTokenToRequest(token: string, request: HttpRequest<any>) {
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return request;
    }

    private getToken(): string {
        return localStorage.getItem(environment.TOKEN_NAME);
    }

    private isExcludeURL(request: HttpRequest<any>): boolean {
        if (excludeUrls.includes(request.url)) {
            return true;
        }
        return false;
    }


}
