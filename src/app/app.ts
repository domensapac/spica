import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settingsComponent/settings-component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SettingsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('moj-projekt');
  
}
