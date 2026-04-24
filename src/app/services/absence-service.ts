import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private http = inject(HttpClient); 
  private platformId = inject(PLATFORM_ID);
  private absenceUrl = '/main-api/api/v1/absences';
  private absenceDefinitionsUrl = '/main-api/api/v1/absencedefinitions'
  cachedAbsences = signal<any[]>([]);
  cachedAbsenceDefinitions = signal<any[]>([]); 

  addAbsence(object : Object){
    if(isPlatformBrowser(this.platformId)){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
      return this.http.post<any>(this.absenceUrl, object, { headers }).pipe(
        tap(res => {
      })
    );
    }
    else{
      return of([]);
    }
  }

  getAbsenceDefinitions(){
    if(isPlatformBrowser(this.platformId)){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      
      return this.http.get<any>(this.absenceDefinitionsUrl, { headers }).pipe(
        tap(res => {
          this.cachedAbsenceDefinitions.set(res); 
          localStorage.setItem('absenceDefinitions', JSON.stringify(res));
      })
    );
    }
    else{
      return of([]);
    }
  }

  getAbsences(date : Date){
    if(isPlatformBrowser(this.platformId)){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const dateFrom = new Date(date); 
      dateFrom.setHours(2, 0, 0, 0); 

      const dateTo = new Date(date); 
      dateTo.setHours(23, 59, 59);
      
      let params = new HttpParams()
        .set('dateFrom', dateFrom.toISOString())
        .set('dateTo', dateTo.toISOString())
      return this.http.get<any>(this.absenceUrl, { headers, params }).pipe(
        tap(res => {
          console.log(res);
          this.cachedAbsences.set(res);
          localStorage.setItem('absencesData', JSON.stringify(res));
      })
    );
    }
    else{
      return of([]);
    }
  }
}
