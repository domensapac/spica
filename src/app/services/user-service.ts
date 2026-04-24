import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersComponent } from '../components/users/users';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private platformId = inject(PLATFORM_ID);

  private http = inject(HttpClient); 

  private userUrl = '/main-api/api/v1/users';
  private absenceUrl = '/main-api/api/v1/absences';

  cachedUsers = signal<any[]>([]);  
  cachedAbsences = signal<any[]>([]);

  constructor() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('usersData');
    if (saved) {
      try {
        this.cachedUsers.set(JSON.parse(saved));
      } catch (e) {
        console.error("Napaka pri branju usersData iz localStorage", e);
      }
    }
  }
}

  getUsers(){
    if(isPlatformBrowser(this.platformId)){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<any>(this.userUrl, { headers }).pipe(
        tap(res => {
          this.cachedUsers.set(res);
          localStorage.setItem('usersData', JSON.stringify(res));
      })
    );
    }
    else{
      return of([]);
    }
  }

  deleteUser(userId : string){
    const previousUsers = [...this.cachedUsers()]; 
      
    this.cachedUsers.update(users => users.filter(user => user.Id !== userId));
    localStorage.setItem('usersData', JSON.stringify(this.cachedUsers()));

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.userUrl}/${userId}`, { headers }).pipe(
      catchError((err) => {
        console.error("Izbris ni uspel"); 
        this.cachedUsers.set(previousUsers);
        localStorage.setItem('usersData', JSON.stringify(previousUsers));
        throw err;
      })
  );
  }

  addUser(object : Object){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })  
    return this.http.post<any>(this.userUrl, object, { headers }).pipe(
      tap(() => {
        this.getUsers().subscribe();
      })
    );
  }

  editUser(userId : string | null, object : Object){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })  
    console.log(userId);
    return this.http.put<any>(`${this.userUrl}/${userId}`, object, { headers }).pipe(
      tap(() => {
        
        this.cachedUsers.update(users => 
          users.map(user => user.Id === userId ? object : user)
        );

        localStorage.setItem('usersData', JSON.stringify(this.cachedUsers()));

      })
    );
  }
}
