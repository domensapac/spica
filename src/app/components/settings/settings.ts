import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  auth = inject(AuthService);
  userService = inject(UserService);
  private platformId = inject(PLATFORM_ID);
  
  client_id: string = ''; 
  client_secret : string = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedConfig = localStorage.getItem('auth_config');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        this.client_id = config.client_id;
        this.client_secret = config.client_secret;
      }
    }
  }

  saveSettings(){
    const authData = {
      client_id: this.client_id,
      client_secret : this.client_secret
    }; 

    localStorage.setItem('auth_config', JSON.stringify(authData));
    this.getCreds(authData);
  }
  
  getCreds(authData : any){ 
    this.auth.getCreds(authData).subscribe();
  }
}
