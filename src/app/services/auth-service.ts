import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); 

  private authUrl = '/auth-api/connect/token';
  token = signal <string | null>(typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  //token = signal<string>(localStorage.getItem('token') || ''); 

  getCreds(authData : any){
    console.log(authData.client_id); 
    console.log(authData.client_secret);
    const payload = new URLSearchParams();
    payload.set('grant_type', 'client_credentials'); 
    payload.set('client_id', authData.client_id); 
    payload.set('client_secret', authData.client_secret); 
    payload.set('scope', 'api');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.authUrl, payload.toString(), { headers })
      .pipe(
        tap(res => {
          console.log(res);
          if(res.access_token){
            this.token.set(res.access_token); 
            localStorage.setItem("token", res.access_token);
            console.log('Success'); 
          }
        })
      )
  }
}
