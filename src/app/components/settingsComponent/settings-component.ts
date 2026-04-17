import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings-component.html',
  styleUrl: './settings-component.css',
})
export class SettingsComponent {
  auth = inject(AuthService);
  
  getCreds(){ 
    this.auth.getCreds().subscribe({
      next: (res) => {
        console.log("Response: ", res);
      },
      error: (err) =>{
        console.error("Error", err);
      }
    })
  }
}
