import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpService {
  constructor(private http: HttpClient, private router: Router) {}

  public getLessons(): Observable<any> {
    const _headers = new HttpHeaders();
    const headers = _headers.append('content-type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('currentUser'));

    return this.http.get('http://test-front.datamaster.com.ua/api/lessons', {headers})
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.setItem('currentUser', '');
            this.router.navigateByUrl('login');
          }
          return throwError(error);
        }),
      );
  }

  public login(body: { email: string, password: string }): Observable<any> {
    return this.http.post('http://test-front.datamaster.com.ua/api/login', body)
      .pipe(
        tap((resp: {token: string}) => localStorage.setItem('currentUser', resp.token)),
        catchError(error => throwError(error)),
      );
  }
}
