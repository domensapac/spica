import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  auth = inject(AuthService);
  
  getCreds(){ 
    this.auth.getCreds().subscribe({
      next: (res) => {
      },
      error: (err) =>{
      }
    })
  }
}
