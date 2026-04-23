import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersComponent } from '../components/users/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private platformId = inject(PLATFORM_ID);

  private http = inject(HttpClient); 

  private userUrl = '/main-api/api/v1/users';

  cachedUsers = signal<any | null>(null); 
  
  getUsers(){
    if(isPlatformBrowser(this.platformId)){
      /*
      if(this.cachedUsers() !== null){
        return of(this.cachedUsers());
      }
      */
     
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any>(this.userUrl, { headers }).pipe(tap(users => this.cachedUsers.set(users)));
    }
    else{
      return of([]);
    }
  }

  deleteUser(userId : string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.userUrl}/${userId} `, { headers });

  }

  addUser(object : Object){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })  
    return this.http.post<any>(this.userUrl, object, { headers });
  }

  editUser(userId : string | null, object : Object){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })  
    console.log(userId);
    return this.http.put<any>(`${this.userUrl}/${userId}`, object, { headers });
  }

  clearCache(){
    this.cachedUsers.set(null);
  }

}
